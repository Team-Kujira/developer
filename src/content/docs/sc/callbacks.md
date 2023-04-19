---
title: The Callback Pattern
description: Using and implementing the standardized callback pattern in your smart contracts.
---

The Kujira ecosystem encourages developers to integrate a standardized callback pattern, fostering composability among smart contracts. The callback pattern consists of two arbitrary binary data snippets:

1. A `callback` Binary, which contains data from the original contract (contract A) that will be passed back to contract A unchanged in the callback.
2. A `data` Binary, which contains data from contract B about its execution, such as return values, modified parameters, and created IDs. Contract A must know the binary ABI of this field that contract B serializes to so that it can correctly deserialize and access the values within.

When contract B executes a callback, it runs an `ExecuteMsg::Callback(CallbackMsg)` call on contract A.

## Creating Contracts with Callbacks

To create a contract that utilizes callbacks, you first need to create a message to execute the contract with the desired callback. Here's a simplified example of invoking a contract with a callback:

```rust
#[cw_serde]
enum CallbackType {
    CallbackA { ... },
    CallbackB { ... },
}

let msg = CosmosMsg::Wasm(WasmMsg::Execute {
    contract_addr: config.other_contract_addr.to_string(),
    funds: config.example_token.coins(&example_amount),
    msg: to_binary(&ExampleExecute {
        some_parameter: value,
        callback: Some(
            to_binary(&CallbackType::CallbackA {
                custom_data: msg.custom_data,
            })?
            .into(),
        ),
    })?,
});

Ok(Response::default().add_message(msg))
```
This example demonstrates how to initiate the execution of a contract with a callback. In this case, the `ExampleExecute` message includes an optional callback parameter, which stores the binary data that will be passed back to contract A. We define the `CallbackType` enum to represent the different types of callbacks that contract A can receive, but this can be any arbitrary serializable data structure.

## Handling Callbacks
To properly handle a callback within your contract, you can use pattern matching to determine the type of callback and process it accordingly. Here's a simplified example:
```rust
// in execute():
match msg {
    // Removed other ExecuteMsg variants for brevity...,
    ExecuteMsg::Callback(cb_msg) => {
        let cb_msg = cb_msg.deserialize_callback()?;
        match cb_msg {
            CallbackType::CallbackA { custom_data } => { ... },
            CallbackType::CallbackB { ... } => { ... },
            // Other callback types can be added here...
        }
    }
}
```

In this example, the `Callback` variant of the `ExecuteMsg` enum is matched and processed based on its specific type. If the Data ABI is known, you can deserialize the data using `deserialize_data` method as shown below:

```rust
let data: YourKnownType = cb_msg.deserialize_data()?;
```
For example, submitting orders to the FIN orderbook contracts will return the `kujira::fin::NewOrderData` struct in the callback data.

**Note:** It is very important to verify the sender of the callback message. If you do not, you may be vulnerable to unauthorized callbacks. You can do this by checking the `sender` field of the `info` parameter in the `execute` function.

## Enabling Callback Handling in Your Contract

To enable your contract to handle callbacks requested by others, you can add an optional `callback` parameter to your execute messages:
```rust
#[cw_serde]
pub enum ExecuteMsg {
    // Other parameters removed for brevity...
    DoSomething { ..., callback: Option<CallbackData> }
}
```

Next, you handle the callback as shown below:
```rust
#[cw_serde]
struct ArbitraryReturnData {
    idx: Uint128,
}
// Here we also handle sending funds alongside the callback.
// If there is no callback, we can send the funds as a BankMsg.
let return_msg = match msg.callback {
    Some(callback) => callback
        .to_message(&info.sender, ArbitraryReturnData {...}, coins(100, "ukuji"))
        .unwrap(),
    None => // Send funds as BankMsg...
};
Ok(Response::new().add_message(return_msg))
```

Remember that you can use `cosmwasm_std::Empty{}` for a callback with no return data:
```rust
let return_msg = match msg.callback {
    Some(callback) => callback
        .to_message(&info.sender, Empty{}, coins(100, "ukuji"))
        .unwrap(),
    None => // Send funds as BankMsg...
};
```
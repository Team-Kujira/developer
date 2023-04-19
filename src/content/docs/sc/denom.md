---
title: Issuing Native Tokens
description: Using the x/denom to issue native tokens managed by your smart contract.
---

The Token Factory module, `x/denom`, allows smart contracts to create their own native denominations. This provides developers with the ability to create custom tokens for their applications, which can be used for various purposes such as governance, utility tokens, or rewards.

## Denominations

In Kujira, a denomination is a string identifier for a token. When creating a new denomination with the `Create` denom message, the `subdenom` parameter is combined with the calling contract's address to create a unique denomination. The format for the resulting denomination is `factory/{address}/{subdenom}`.

## Interfaces Exposed to Smart Contracts

The Token Factory module exposes the following interfaces for use by smart contracts:

### Create

This message allows the contract to create a new denomination:

```rust
DenomMsg::Create {
    subdenom: Denom,
}
```

### ChangeAdmin

This message allows the contract to change the admin of a denomination:

```rust
DenomMsg::ChangeAdmin {
    denom: Denom,
    address: Addr,
}
```

### Mint

This message allows the contract to mint new tokens of a specific denomination:

```rust
DenomMsg::Mint {
    denom: Denom,
    amount: Uint128,
    recipient: Addr,
}
```

### Burn

This message allows the contract to burn tokens of a specific denomination:

```rust
DenomMsg::Burn {
    denom: Denom,
    amount: Uint128,
}
```

## Example: Creating a Denomination

Here's an example of creating a new denomination from a smart contract:

```rust
let response = Response::new()
    .add_message(DenomMsg::Create {
        subdenom: "mytoken".into(),
    });
```

In this example, a new denomination will be created with the subdenom "mytoken". The resulting denomination will be `factory/{address}/mytoken`.

## Example: Minting and Burning Tokens

Here's an example of minting new tokens of a specific denomination:

```rust
let response = Response::new()
    .add_message(CosmosMsg::Custom(KujiraMsg::Denom(DenomMsg::Mint {
        denom: my_denom.clone().into(),
        amount,
        recipient: recipient_address.clone(),
    })));
```

And here's an example of burning tokens of a specific denomination:

```rust
let response = Response::new()
    .add_message(CosmosMsg::Custom(KujiraMsg::Denom(DenomMsg::Burn {
        denom: my_denom.clone().into(),
        amount,
    })));
```

## Denomination Creation Fee

There is a fee associated with creating a new denomination. On mainnet, the fee is 10 KUJI, and on testnet, it is 100 KUJI. Your contract must have sufficient funds to pay the fee in order to create a new denomination.

---
title: Smart Contracts on Kujira
description: A high-level overview of developing Smart Contracts on Kujira.
---

Kujira core is enabled with CosmWasm `v1.2` and will support IBC-go v7. For a detailed overview of getting started with CosmWasm smart contracts, please refer to the [CosmWasm Book](https://book.cosmwasm.com/), and other resources. Below is a short explanation of how to get your smart contracts ready for Kujira.

## Getting Started

We assume that you have a working CosmWasm smart contract. In the `Cargo.toml` file, you must add the `kujira` dependency.

```bash
$ cargo add kujira
```

or

```toml
# Cargo.toml

[dependencies]
kujira = "0.8"
```
Kujira has several custom messages and queries that are additions to the Cosmos SDK' standard messages. These are defined in the `kujira` crate, which we discuss in [later pages](/kujira-rs). We have added the crate to our contract dependencies, and now want to add the `KujiraMsg` types to our `Response` types, and `KujiraQuery` types to our `Deps` to enable the Kujira-specific message and query types.

```rust
// src/contract.rs
use kujira::{KujiraMsg, KujiraQuery};

#[entry_point]
pub fn instantiate(
    deps: DepsMut<KujiraQuery>,
    env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> Result<Response<KujiraMsg>, ContractError> {
    // ...
}

// Do the same for execute and query
```

We strive for maximum composability and interoperability with other smart contracts on Kujira. We implore you to do the same. If you have a protocol launching on Kujira, we recommend reading our [recommended practices](/guides/practices) for smart contracts. Additionally, we have several guides for getting the most out of what Kujira core has to offer:
* [Using the built-in oracles to simplify price feeds](/sc/oracles)
* [Scheduling recurring tasks using the scheduler](/sc/scheduler)
* [Issuing native tokens using the tokenfactory](/sc/tokenfactory)

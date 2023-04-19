---
title: "kujira.rs: Cosmwasm extensions for Kujira"
description: Describes the kujira.rs crate, alongside conventions, examples, and the sub-crates.
---

kujira-rs is the Rust crate for Kujira, providing a collection of modules and utilities for developers working with the Kujira ecosystem. The crate is organized into several sub-crates, each focused on a specific protocol interface within Kujira.

## Sub-crates
The `kujira` crate is organized into several sub-crates, each focused on a specific protocol interface within Kujira. The sub-crates are:
* `kujira-fin`: Interfaces for interacting with the FIN orderbook DEX.
* `kujira-ghost`: Interfaces for interacting with the GHOST money market.
* `kujira-orca`: Interfaces for interacting with the ORCA liquidation engine.
* `kujira-stable`: Interfaces for interacting with the USK stablecoin controller, and associated contracts.
* `kujira-bow`: Interfaces for interacting with the BOW market maker.

These sub-crates can be accessed using the following syntax:
```rust
use kujira::{fin, ghost, orca, stable, bow};
```

## kujira-std
In addition to the protocol-specific sub-crates, kujira-rs also includes a `kujira-std` sub-crate, which contains the most common interfaces and utilities used across the Kujira ecosystem. This sub-crate is designed to provide developers with a set of general-purpose tools and components that can be used in various projects and smart contracts, as well as methods for interacting with Kujira core modules from within smart contracts.

The kujira_std sub-crate includes:
* Standardized interfaces for interacting with Kujira core modules, such as `x/denom`, and `x/oracle`, alongside supporting structs and methods.
* A standardized interface for implementing the callback pattern, to help foster composability between smart contracts in the Kujira ecosystem.
* Utilities for verifying Merkle proofs, fetching the fee address, creating token release schedules, and so on.
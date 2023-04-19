---
title: Oracle Integration Guide
description: A guide to using the built-in oracles to simplify and secure feeding price data into your smart contracts.
---

In this article, we will discuss how to use Kujira's built-in oracle for obtaining price data and perform calculations with normalized prices in your smart contracts. We will cover how to query exchange rates, normalize prices, and use them in calculations.

## Querying Exchange Rates

To query exchange rates, you need to use the `KujiraQuerier` struct provided by the Kujira crate. First, create a new `KujiraQuerier` instance by passing a `querier` to its constructor. Then, you can use the `query_exchange_rate` method to get the exchange rate for a specific token denomination.

Here's an example of how to query the exchange rate for a given denomination:

```rust
use kujira::{KujiraQuery, KujiraQuerier, HumanPrice};

// ...

pub fn execute(
    deps: DepsMut<KujiraQuery>,
    // ...
) {
    let querier = KujiraQuerier::new(deps.querier);
    let human_price = querier.query_exchange_rate(config.denom)?;
    // ...
}
```

In this example, `human_price` is of type `HumanPrice`, which represents the exchange rate without normalization. It's important to note that you should **not** use `HumanPrice` directly in calculations, but rather convert it to `NormalizedPrice` first.

## Normalizing Prices

To convert a `HumanPrice` to a `NormalizedPrice`, you can use the `normalize` method, passing the number of decimal places for the token as an argument. Normalized prices should be used in all calculations involving the value of coins given the oracle price.

Here's an example of how to convert a `HumanPrice` to a `NormalizedPrice`:

```rust
use kujira::{HumanPrice, NormalizedPrice};

// ...

pub fn deposit(
    deps: DepsMut<KujiraQuery>,
    // ...
) {
    // ...
    let normalized_price = human_price.normalize(config.token_decimals);
    // use normalized price for calculating the value, etc
}
```

## Using Normalized Prices in Calculations
A `NormalizedPrice` can be used as a stand-in for the `Decimal` type for many arithmetic operations. For example, you can use it to multiply a `Uint128` value by the exchange rate to get the value of the coins in the oracle's denomination. If you need to extract the underlying `Decimal` value, you can use the `inner()` method. Be sure to see the `kujira-std` crate's documentation for more information on the specific trait implementations of `NormalizedPrice`.

## Dangers of Using Non-Normalized Prices

Using non-normalized prices when calculating values can lead to incorrect results, especially when comparing values of tokens with different decimal places. It's essential to always normalize prices before performing calculations to avoid these issues.

Here are some potential dangers of using non-normalized prices:

1. **Incorrect comparisons**: When comparing the values of two tokens with different decimal places, using non-normalized prices might lead to incorrect results. For example, comparing a token with 6 decimal places to another with 18 decimal places without normalization could result in a wrong relative value.

2. **Inaccurate calculations**: Performing calculations with non-normalized prices can lead to incorrect outcomes, as the underlying arithmetic might not account for the different decimal places of the tokens involved. This can cause issues when calculating the value of a trade, converting tokens, or performing any operation that relies on accurate price data.

To mitigate these risks, you should always use the `NormalizedPrice` type for calculations. However, if you know what you're doing and are confident that you're handling normalization correctly, you can use the `unsafe_unchecked` function to obtain a `NormalizedPrice` directly. This should be done with caution, as it does not check that the price is normalized to the reference decimal places.

```rust
let normalized_price = NormalizedPrice::unsafe_unchecked(price);
```

Using `NormalizedPrice` in function signatures helps ensure normalization across function boundaries. By leveraging Rust's type system, you can depend on the type system to help guarantee that the prices used in your functions are normalized, avoiding potential issues caused by non-normalized prices.

If you need to extract the underlying `Decimal` value from a `NormalizedPrice`, you can use the `inner()` method:

```rust
let decimal_value = normalized_price.inner();
```

This allows you to access the raw decimal value for further processing or conversion if needed.
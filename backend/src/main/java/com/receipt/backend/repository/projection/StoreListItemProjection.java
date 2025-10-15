package com.receipt.backend.repository.projection;

import java.time.LocalDate;

public interface StoreListItemProjection {
    Long getStoreId();
    String getStoreName();
    String getMemo();
    LocalDate getPurchaseDate();

    Long getItemId();
    Long getItemQuantity();
    Long getItemPrice();

    Long getItemCount();
    Long getTotalAmount();
    String getItemNames();
    String getCategoryName();
}

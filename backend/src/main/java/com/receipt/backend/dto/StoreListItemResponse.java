package com.receipt.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreListItemResponse {
    private Long storeId;
    private String storeName;
    private String memo;
    private LocalDate purchaseDate;

    private Long itemId;
    private long itemCount;
    private long totalAmount;
    private String itemNames;
    private long itemQuantity;
    private long itemPrice;

    private String categoryName;
}

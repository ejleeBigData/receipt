package com.receipt.backend.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    private long itemCount;
    private long totalAmount;      // price*quantity 합 (Long/BigDecimal 타입은 엔티티에 맞춰 조정)
    private String anyItemName;    // 대표로 하나 (MIN/최신 등)

    // 프런트 표시용 파생 필드
    public String getItemTitle() {
        if (itemCount <= 0) return "-";
        if (itemCount == 1) return anyItemName;                 // 1개: 아이템명
        return anyItemName + " 외 " + (itemCount - 1) + "건";   // 2개+: 대표 1개 + 개수
    }
}

package com.receipt.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreResponse {
    private Long id;
    private String name;
    private String memo;

    @JsonFormat(pattern = "yyyyMMdd")
    private LocalDate purchaseDate;

    private List<ItemResponse> items;
    private List<CategoryResponse> categories;
}

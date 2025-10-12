package com.receipt.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StoreRequest {
    @JsonFormat(pattern = "yyyyMMdd")   // JSON 직렬/역직렬 시 형식 지정
    @NotNull
    private LocalDate purchaseDate;

    private String name;
    private String memo;

    private List<ItemRequest> items;
}

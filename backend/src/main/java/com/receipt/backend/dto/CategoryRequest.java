package com.receipt.backend.dto;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.web.bind.annotation.PostMapping;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CategoryRequest {
    @NotBlank(message = "이름은 필수 항목 입니다")
    @Size(max = 100, message = "이름은 100자 이내 입니다")
    private String name;

    @Builder.Default
    @PositiveOrZero(message = "정렬 순서는 0 이상이어야 합니다")
    private Integer sort = 0 ;

    @Builder.Default
    private boolean accrue = false;

    @PositiveOrZero(message = "상한선은 0 이상이어야 합니다")
    @Digits(integer = 12, fraction = 0, message = "상한선은 정수만 입력 가능합니다")
    private BigDecimal cut;

    // 공백 정규화(앞뒤 공백 제거 + 연속 공백 1칸으로)
    public void setName(String name) {
        this.name = (name == null) ? null : name.trim().replaceAll("\\s+", " ");
    }
}
package com.receipt.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

@Entity
@Table(
        name = "items",
        indexes = {
                @Index(name = "idx_items_user_id", columnList = "user_id"),

        },
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_items_name", columnNames = {"name"})
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Items {
}

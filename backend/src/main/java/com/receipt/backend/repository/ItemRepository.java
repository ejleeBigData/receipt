package com.receipt.backend.repository;

import com.receipt.backend.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByStoreIdAndUserId(Long storeId, Long userId);

    Optional<Item> findByIdAndUserId(Long id, Long userId);
}

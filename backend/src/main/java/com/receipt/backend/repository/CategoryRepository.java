package com.receipt.backend.repository;

import com.receipt.backend.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @EntityGraph(attributePaths = {"user"})
    @Query("SELECT c FROM Category c WHERE c.user.id = :userId ORDER BY c.sort ASC")
    Page<Category> findByUserId(@Param("userId") Long userId, Pageable pageable);
}

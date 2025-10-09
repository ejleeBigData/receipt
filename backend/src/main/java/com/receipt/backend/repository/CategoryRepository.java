package com.receipt.backend.repository;

import com.receipt.backend.entity.Category;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @EntityGraph(attributePaths = {"user"})
    @Query("SELECT c FROM Category c WHERE c.user.id = :userId ORDER BY c.sort ASC, c.name ASC ")
    List<Category> findAllByUserIdOrderBySortAscNameAsc(@Param("userId") Long userId);

    // 생성 중 중복 체크
    boolean existsByUserIdAndNameIgnoreCase(Long userId, String name);

    // 수정 중 중복 체크(자기 자신 제외)
    boolean existsByUserIdAndNameIgnoreCaseAndIdNot(Long userId, String name, Long id);
}

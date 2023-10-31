package com.casacriativa_backend.repository;

import com.casacriativa_backend.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialRepository extends JpaRepository <Material, Integer> {
}

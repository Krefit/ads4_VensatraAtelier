package com.casacriativa_backend.repository;

import com.casacriativa_backend.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MaterialRepository extends JpaRepository <Material, Integer> {
    //List<Material> findMaterialByProdutoId(int produtoID);
    List<Material> findByMateriaisProdutos_Produto_Id(int produtoId);
}

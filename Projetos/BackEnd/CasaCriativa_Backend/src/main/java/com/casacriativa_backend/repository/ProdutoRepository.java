package com.casacriativa_backend.repository;

import com.casacriativa_backend.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProdutoRepository extends JpaRepository <Produto, Integer> {
    List<Produto> findByProdutosMateriais_Material_Id(int materialId);

    List<Produto> findByDescricaoContaining(String descricao);
}

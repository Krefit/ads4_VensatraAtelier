package com.casacriativa_backend.service;

import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.repository.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {


    private final ProdutoRepository produtoRepository;
    private final MaterialService materialService;

    public ProdutoService(ProdutoRepository produtoRepository, MaterialService materialService) {
        this.produtoRepository = produtoRepository;
        this.materialService = materialService;
    }

    public List<Produto> listarProduto() {
        return produtoRepository.findAll();
    }

    public void createProduto(Produto produto) {
        produtoRepository.save(produto);
    }


    public void editarProduto(Integer id, Produto produto) {
        Optional<Produto> recordFoundOptional = produtoRepository.findById(id);
        if (recordFoundOptional.isEmpty()) {
            Produto recordFound = recordFoundOptional.get();
            recordFound.setDescricao(produto.getDescricao());

            produtoRepository.save(recordFound);
        } else {
            throw new RuntimeException("Record não encontrado com o ID: " + id);
        }
    }

    public void deleteProduto(Integer id) {
        produtoRepository.deleteById(id);
    }
}

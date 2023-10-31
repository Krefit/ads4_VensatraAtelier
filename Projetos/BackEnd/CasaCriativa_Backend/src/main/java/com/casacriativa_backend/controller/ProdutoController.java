package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.service.ProdutoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public List<Produto> listarProduto() {
        return produtoService.listarProduto();
    }

    @PostMapping
    public void createProduto(@RequestBody Produto produto) {
        produtoService.createProduto(produto);
    }

    @PutMapping("/{id}")
    public void editarProduto(@PathVariable("id") Integer id, @RequestBody Produto produto) {
        produtoService.editarProduto(id, produto);
    }

    @DeleteMapping("/{id}")
    public void deleteProduto(@PathVariable("id") Integer id) {
        produtoService.deleteProduto(id);
    }
}

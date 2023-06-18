package com.casacriativa_backend;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/produto")
public class ProdutoRest {

    @Autowired
    private ProdutoDao produtoDao;

    @GetMapping
    public List<Produto> get(){
        return produtoDao.findAll();
    }

    @PostMapping
    public void post(@RequestBody Produto produto){
        produtoDao.save(produto);
    }

    @PutMapping("/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Produto produto) {
        Optional<Produto> produtoExistenteOptional = produtoDao.findById(id);
        if (produtoExistenteOptional.isPresent()) {
            Produto produtoExistente = produtoExistenteOptional.get();
            produtoExistente.setProdDescricao(produto.getProdDescricao());
            produtoExistente.setProdCategoria(produto.getProdCategoria());
            produtoExistente.setProdCustoExtra(produto.getProdCustoExtra());
            produtoExistente.setProdIdMaterial(produto.getProdIdMaterial());
            produtoExistente.setProdQtdMaterial(produto.getProdQtdMaterial());
            produtoExistente.setProdProcentLucro(produto.getProdProcentLucro());
            produtoExistente.setProdIdFornecedor(produto.getProdIdFornecedor());
            produtoExistente.setProdTempoMaoObra(produto.getProdTempoMaoObra());

            produtoDao.save(produtoExistente);
        } else {
            throw new RuntimeException("cliente não encontrado com o ID: " + id);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        produtoDao.deleteById(id);
    }
}

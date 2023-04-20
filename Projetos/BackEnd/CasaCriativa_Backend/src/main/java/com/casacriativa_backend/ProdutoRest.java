package com.casacriativa_backend;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
}

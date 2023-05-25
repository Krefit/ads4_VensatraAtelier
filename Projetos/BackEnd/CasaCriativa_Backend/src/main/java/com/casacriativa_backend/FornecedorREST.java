package com.casacriativa_backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping

        ("/fornecedores")
public class FornecedorREST {

    @Autowired
    private FornecedorDAO fornecedorDAO;

    @GetMapping
    public List<Fornecedor> get() {
        return fornecedorDAO.findAll();
    }

    @PostMapping
    public void post(@RequestBody Fornecedor fornecedor){fornecedorDAO.save(fornecedor);}
}

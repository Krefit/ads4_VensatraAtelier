package com.casacriativa_backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fornecedores")
public class FornecedorREST {

    @Autowired
    private FornecedorDAO fornecedorDAO;

    @GetMapping
    public List<Fornecedor> get() {
        return fornecedorDAO.findAll();
    }

    @PostMapping
    public void post(@RequestBody Fornecedor fornecedor) {
        fornecedorDAO.save(fornecedor);
    }

    @PutMapping("/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Fornecedor fornecedor) {
        Optional<Fornecedor> fornecedorExistenteOptional = fornecedorDAO.findById(id);
        if (fornecedorExistenteOptional.isPresent()) {
            Fornecedor fornecedorExistente = fornecedorExistenteOptional.get();
            fornecedorExistente.setFornNome(fornecedor.getFornNome());
            fornecedorExistente.setFornCNPJ(fornecedor.getFornCNPJ());
            fornecedorExistente.setFornEndereco(fornecedor.getFornEndereco());
            fornecedorExistente.setFornTelefone(fornecedor.getFornTelefone());
            fornecedorExistente.setFornEstado(fornecedor.getFornEstado());
            fornecedorExistente.setFornCidade(fornecedor.getFornCidade());

            fornecedorDAO.save(fornecedorExistente);
        } else {
            throw new RuntimeException("Fornecedor não encontrado com o ID: " + id);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        fornecedorDAO.deleteById(id);
    }
}


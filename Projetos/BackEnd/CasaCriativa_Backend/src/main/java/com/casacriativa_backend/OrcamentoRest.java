package com.casacriativa_backend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping

        ("/orcamento")
public class OrcamentoRest {

    @Autowired
    private OrcamentoDAO orcamentoDAO;

    @GetMapping
    public List<Orcamento> get() {
        return orcamentoDAO.findAll();
    }

    @PostMapping
    public void post(@RequestBody Orcamento orcamento){orcamentoDAO.save(orcamento);
    }

    @PutMapping("/{id}")
    public void editar(@PathVariable("id") int id, @RequestBody Orcamento orcamento) {
        Optional<Orcamento> orcamentoExistenteOptional = orcamentoDAO.findById(id);
        if (orcamentoExistenteOptional.isPresent()) {
            Orcamento orcamentoExistente = orcamentoExistenteOptional.get();
            orcamentoExistente.setOrcaID(orcamento.getOrcaID());
            orcamentoExistente.setOrcaIDCliente(orcamento.getOrcaIDCliente());
            orcamentoExistente.setOrcaDtInicioProd(orcamento.getOrcaDtInicioProd());
            orcamentoExistente.setOrcaDtEntrega(orcamento.getOrcaDtEntrega());
            orcamentoExistente.setOrcaIDProduto(orcamento.getOrcaIDProduto());
            orcamentoExistente.setOrcaQtdProduto(orcamento.getOrcaQtdProduto());

            orcamentoDAO.save(orcamentoExistente);
        } else {
            throw new RuntimeException("cliente não encontrado com o ID: " + id);
        }
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        orcamentoDAO.deleteById(id);
    }
}

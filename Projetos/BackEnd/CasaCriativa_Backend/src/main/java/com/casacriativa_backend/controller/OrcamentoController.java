package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Orcamento;
import com.casacriativa_backend.service.OrcamentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orcamento")
public class OrcamentoController {


    private final OrcamentoService orcamentoService;

    public OrcamentoController(OrcamentoService orcamentoService) {
        this.orcamentoService = orcamentoService;
    }

    @GetMapping
    public List<Orcamento> listarOrcamento() {
        return orcamentoService.listarOrcamento();
    }

    @PostMapping
    public void createOrcamento(@RequestBody Orcamento orcamento) {
        orcamentoService.createOrcamento(orcamento);
    }

    @PutMapping("/{id}")
    public void editarOrcamento(@PathVariable("id") Integer id, @RequestBody Orcamento orcamento) {
        orcamentoService.editarOrcamento(id, orcamento);
    }

    @DeleteMapping("/{id}")
    public void deleteOrcamento(@PathVariable("id") Integer id) {
        orcamentoService.deleteOrcamento(id);
    }
}

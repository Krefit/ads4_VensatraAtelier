package com.casacriativa_backend.service;

import com.casacriativa_backend.model.Orcamento;
import com.casacriativa_backend.repository.OrcamentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrcamentoService {

    private final OrcamentoRepository orcamentoRepository;

    public OrcamentoService(OrcamentoRepository orcamentoRepository) {
        this.orcamentoRepository = orcamentoRepository;
    }

    public List<Orcamento> listarOrcamento() {
        return orcamentoRepository.findAll();
    }

    public void createOrcamento(Orcamento orcamento) {
        orcamentoRepository.save(orcamento);
    }

    public void editarOrcamento(Integer id, Orcamento orcamento) {
        Optional<Orcamento> orcamentoFoundOptional = orcamentoRepository.findById(id);
        if (orcamentoFoundOptional.isPresent()) {
            Orcamento recordFound = orcamentoFoundOptional.get();
            recordFound.setCliente(orcamento.getCliente());
            recordFound.setDataEntrega(orcamento.getDataEntrega());
            recordFound.setListProduto(orcamento.getListProduto());
            recordFound.setQuantidade(orcamento.getQuantidade());
            recordFound.setDesconto(orcamento.getDesconto());

            orcamentoRepository.save(recordFound);
        } else {
            throw new RuntimeException("cliente não encontrado com o ID: " + id);
        }
    }

    public void deleteOrcamento(Integer id) {
        orcamentoRepository.deleteById(id);
    }
}

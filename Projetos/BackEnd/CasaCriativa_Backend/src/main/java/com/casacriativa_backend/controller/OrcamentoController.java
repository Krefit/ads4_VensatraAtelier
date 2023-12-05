package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Orcamento;
import com.casacriativa_backend.model.Orcamento_Produtos;
import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.repository.ClienteRepository;
import com.casacriativa_backend.repository.OrcamentoRepository;
import com.casacriativa_backend.repository.Orcamento_ProdutosRepository;
import com.casacriativa_backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")///orcamento")
public class OrcamentoController {

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    OrcamentoRepository orcamentoRepository;

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    Orcamento_ProdutosRepository orcamento_produtosRepository;

    @GetMapping("/orcamento")
    public ResponseEntity<List<Map<String, Object>>> getAllOrcamentos() {
        List<Orcamento> orcamentos = new ArrayList<>();


        if (orcamentos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<Map<String, Object>> response = new ArrayList<>();
        for (Orcamento orcamento : orcamentos) {
            Map<String, Object> orcamentoMap = new LinkedHashMap<>();
            orcamentoMap.put("id", orcamento.getId());
            orcamentoMap.put("desconto", orcamento.getDesconto());
            orcamentoMap.put("", orcamento.getDataEntrega());
            orcamentoMap.put("produtos", getProdutosForOrcamento(orcamento));
            response.add(orcamentoMap);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private List<Map<String, Object>> getProdutosForOrcamento(Orcamento orcamento){
        List<Map<String, Object>> produtoList = new ArrayList<>();
        Set<Orcamento_Produtos> orcamentoProdutos = orcamento.getOrcamentoProdutos();

        for(Orcamento_Produtos op : orcamentoProdutos){
            Map<String, Object> produtoMap = new LinkedHashMap<>();
            Produto produto = op.getProduto();
            produtoMap.put("produtoId", produto.getId());
            produtoMap.put("nome", produto.getNome());
            produtoMap.put("descricao", produto.getDescricao());
            produtoMap.put("nomeFoto", produto.getNomeFoto());
            produtoMap.put("", op.getQuantidade());

            produtoList.add(produtoMap);
        }

        return produtoList;
    }

    @GetMapping("/orcamento/{id}")
    public ResponseEntity<List<Map<String, Object>>> getOrcamentoPorId(@PathVariable("id") int id){
        List<Map<String, Object>> response = new ArrayList<>();
        Orcamento orcamento = orcamentoRepository.findById(id).orElseThrow();

        Map<String, Object> orcamentoMap = new LinkedHashMap<>();
        orcamentoMap.put("id", orcamento.getId());
        orcamentoMap.put("desconto", orcamento.getDesconto());
        orcamentoMap.put("", orcamento.getDataEntrega());
        orcamentoMap.put("produtos", getProdutosForOrcamento(orcamento));
        response.add(orcamentoMap);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/orcamento/add-with-produtos")
    public ResponseEntity<Orcamento> addOrcamentoWithProdutos(@RequestBody Map<String, Object> requestData){

        Map<String,Object> orcamentoData = (Map<String, Object>) requestData.get("orcamento");
        List<Map<String, Object>> selectedProdutos = (List<Map<String, Object>>) requestData.get("produtos");

        Orcamento orcamento = new Orcamento();
        String teste = orcamentoData.get("orcaDescricao").toString();
        orcamento.setDescricao(teste);

        Orcamento savedOrcamento = orcamentoRepository.save(orcamento);

        for(Map<String, Object> produtoData : selectedProdutos){
            int produtoId = (int) produtoData.get("produtoId");
            int quantity = (int) produtoData.get("quantity");

            Produto produto = produtoRepository.findById(produtoId).orElse(null);

            if(produto != null){
                savedOrcamento.addProduto(produto, quantity);
            }else{

            }
        }

        Orcamento updatedOrcamento = orcamentoRepository.save(savedOrcamento);

        return new ResponseEntity<>(updatedOrcamento, HttpStatus.OK);
    }


}


/*
* ResponseEntity<List<Map<String, Object>>>
* */
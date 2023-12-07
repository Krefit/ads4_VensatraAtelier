package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Cliente;
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

import java.math.BigDecimal;
import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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

        orcamentos = orcamentoRepository.findAll();

        if (orcamentos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<Map<String, Object>> response = new ArrayList<>();
        for (Orcamento orcamento : orcamentos) {
            Map<String, Object> orcamentoMap = new LinkedHashMap<>();
            orcamentoMap.put("id", orcamento.getId());
            orcamentoMap.put("desconto", orcamento.getDesconto());
            orcamentoMap.put("dataEmtregta", orcamento.getDataEntrega());
            orcamentoMap.put("produtos", getProdutosForOrcamento(orcamento));
            orcamentoMap.put("cliente", orcamento.getCliente().getId());
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
    public ResponseEntity<Orcamento> addOrcamentoWithProdutos(@RequestBody Map<String, Object> requestData) throws ParseException {

        Map<String,Object> orcamentoData = (Map<String, Object>) requestData.get("orcamento");
        List<Map<String, Object>> selectedProdutos = (List<Map<String, Object>>) requestData.get("produtos");



        Orcamento orcamento = new Orcamento();

        orcamento.setDesconto(BigDecimal.valueOf(Long.parseLong(orcamentoData.get("desconto").toString())));


        DateTimeFormatter formatter = DateTimeFormatter.ISO_INSTANT;
        Instant instant = Instant.from(formatter.parse(orcamentoData.get("dataInicioProd").toString()));
        LocalDateTime dateTime = LocalDateTime.ofInstant(instant, ZoneId.of("UTC")); // Convert to your desired timezone if necessary

        orcamento.setDataEntrega(dateTime);
        orcamento.setQuantidade(0);

//        String teste = orcamentoData.get("orcaDescricao").toString();
//        orcamento.setDescricao(teste);

        Orcamento savedOrcamento = orcamentoRepository.save(orcamento);

        Integer clienteId = (int) orcamentoData.get("cliente_id");

        Cliente clienteOrcamento = clienteRepository.findById(clienteId).orElse(null);

        savedOrcamento.setCliente(clienteOrcamento);

        for(Map<String, Object> produtoData : selectedProdutos){

           // System.out.println((int) produtoData.get("quantidadeProduto"));

            Integer produtoId = (int) produtoData.get("produtoId");
            int quantity = Integer.parseInt(produtoData.get("quantidadeProduto").toString());

            Produto produto = produtoRepository.findById(produtoId).orElse(null);

            if(produto != null){
                savedOrcamento.addProduto(produto, quantity);
            }else{

            }
        }



        Orcamento updatedOrcamento = orcamentoRepository.save(savedOrcamento);

        return new ResponseEntity<>(updatedOrcamento, HttpStatus.OK);
    }

    @DeleteMapping("/orcamento/{id}")
    public ResponseEntity<HttpStatus> deleteOrcamento(@PathVariable("id") int id){
        try{
            Orcamento orcamento = orcamentoRepository.findById(id).orElseThrow();

            Set<Orcamento_Produtos> orcamentoProdutos = orcamento.getOrcamentoProdutos();
            for(Orcamento_Produtos op : orcamentoProdutos){
                orcamento_produtosRepository.delete(op);
            }

            orcamentoRepository.delete(orcamento);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/orcamento/{id}")
    public ResponseEntity<Orcamento> updateOrcamento(@PathVariable("id") int id, @RequestBody Orcamento updatedOrcamentoData) {
        try {
            Orcamento existingOrcamento = orcamentoRepository.findById(id).orElseThrow();

            // Update existing Orcamento properties with the new data
            existingOrcamento.setDescricao(updatedOrcamentoData.getDescricao());
            existingOrcamento.setDataEntrega(updatedOrcamentoData.getDataEntrega());
            existingOrcamento.setDesconto(updatedOrcamentoData.getDesconto());
            // Update other properties as needed

            // Update Cliente (if needed)
            Cliente updatedCliente = updatedOrcamentoData.getCliente();
            if (updatedCliente != null) {
                Cliente existingCliente = clienteRepository.findById(updatedCliente.getId()).orElse(null);
                if (existingCliente != null) {
                    existingOrcamento.setCliente(existingCliente);
                }
                // If you need to update Cliente properties, update them here
                // existingCliente.setNome(updatedCliente.getNome());
                // Update other Cliente properties as needed
            }

            // Update the list of produtos associated with the Orcamento
            Set<Orcamento_Produtos> existingOrcamentoProdutos = existingOrcamento.getOrcamentoProdutos();
            existingOrcamentoProdutos.clear(); // Remove existing associations

            Set<Orcamento_Produtos> updatedOrcamentoProdutos = updatedOrcamentoData.getOrcamentoProdutos();
            if (updatedOrcamentoProdutos != null && !updatedOrcamentoProdutos.isEmpty()) {
                for (Orcamento_Produtos updatedOp : updatedOrcamentoProdutos) {
                    Produto produto = produtoRepository.findById(updatedOp.getProduto().getId()).orElse(null);
                    if (produto != null) {
                        Orcamento_Produtos orcamentoProduto = new Orcamento_Produtos();
                        orcamentoProduto.setOrcamento(existingOrcamento);
                        orcamentoProduto.setProduto(produto);
                        orcamentoProduto.setQuantidade(updatedOp.getQuantidade());
                        // Set other Orcamento_Produtos properties if needed

                        existingOrcamentoProdutos.add(orcamentoProduto);
                    }
                }
            }

            // Save the updated Orcamento
            Orcamento updatedOrcamento = orcamentoRepository.save(existingOrcamento);

            return new ResponseEntity<>(updatedOrcamento, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}


/*
* ResponseEntity<List<Map<String, Object>>>
* */
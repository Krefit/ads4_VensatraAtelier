package com.casacriativa_backend.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.casacriativa_backend.model.Material;
import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.model.Produto_Materiais;
import com.casacriativa_backend.repository.MaterialRepository;
import com.casacriativa_backend.repository.ProdutoRepository;
import com.casacriativa_backend.repository.Produto_MateriaisRepository;
import com.casacriativa_backend.service.ProdutoService;

@RestController
@RequestMapping("/api")
public class ProdutoController {

    @Autowired
    ProdutoRepository produtoRepository;

    @Autowired
    ProdutoService produtoService;

    @Autowired
    MaterialRepository materialRepository;

    @Autowired
    private Produto_MateriaisRepository produtoMateriaisRepository;


    @GetMapping("/produtos")
    public ResponseEntity<List<Produto>> listarProduto() {
        List<Produto> produtos = produtoService.listarProduto();
        return ResponseEntity.ok().body(produtos);
    }
    @GetMapping("/produto")
    public ResponseEntity<List<Map<String, Object>>> getAllProdutos(@RequestParam(required = false) String descricao) {
        List<Produto> produtos = new ArrayList<>();

        if (descricao == null)
            produtoRepository.findAll().forEach(produtos::add);
        else
            produtoRepository.findByDescricaoContaining(descricao).forEach(produtos::add);

        if (produtos.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        List<Map<String, Object>> response = new ArrayList<>();
        for (Produto produto : produtos) {
            Map<String, Object> produtoMap = new LinkedHashMap<>();
            produtoMap.put("id", produto.getId());
            produtoMap.put("descricao", produto.getDescricao());
            produtoMap.put("materiais", getMaterialsForProduto(produto)); // Method to get materials with quantidade
            response.add(produtoMap);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Method to get materials with quantidade for a product
    private List<Map<String, Object>> getMaterialsForProduto(Produto produto) {
        List<Map<String, Object>> materialsList = new ArrayList<>();
        Set<Produto_Materiais> produtoMateriais = produto.getProdutosMateriais();
        for (Produto_Materiais pm : produtoMateriais) {
            Map<String, Object> materialMap = new LinkedHashMap<>();
            Material material = pm.getMaterial();
            materialMap.put("materialId", material.getId());
            materialMap.put("descricao", material.getDescricao());
            materialMap.put("quantidade", pm.getQuantidade()); // Include quantidade
            // Add more material details as needed
            materialsList.add(materialMap);
        }
        return materialsList;
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<Produto> getProdutoPorId(@PathVariable("id") int id){
        Produto produto = produtoRepository.findById(id).orElseThrow(RuntimeException::new);

        return new ResponseEntity<>(produto,HttpStatus.OK);
    }

    @GetMapping("/produto/desc/{descricao}")
    public ResponseEntity<List<Produto>> getProdutoPorDescricao(@PathVariable("descricao") String descricao){
        List<Produto> produto = new ArrayList<Produto>();

        produtoRepository.findByDescricaoContaining(descricao).forEach(produto::add);

        if(produto.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else

        return new ResponseEntity<>(produto, HttpStatus.OK);
    }

//    @PostMapping("/produto")
//    public ResponseEntity<Produto> crieProduto(@RequestBody Produto produto){
//        produtoRepository.save(produto);
//        return ResponseEntity.ok().build();
//    }

    @PutMapping("/produto/{id}")
    public ResponseEntity<Produto> updateProduto(@PathVariable("id") int id, @RequestBody Produto produto){
        Produto _produto = produtoRepository.findById(id).orElseThrow();

        _produto.setDescricao(produto.getDescricao());

        return new ResponseEntity<>(produtoRepository.save(_produto), HttpStatus.OK);
    }

    @DeleteMapping("/produto/{id}")
    public ResponseEntity<HttpStatus> deleteProduto(@PathVariable("id") int id) {
        try {
            // Fetch the product entity by ID
            Produto produto = produtoRepository.findById(id).orElseThrow();

            // Handle associated entries in Produto_Materiais
            Set<Produto_Materiais> produtoMateriais = produto.getProdutosMateriais();
            for (Produto_Materiais pm : produtoMateriais) {
                produtoMateriaisRepository.delete(pm);
            }

            // Delete the product entity
            produtoRepository.delete(produto);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/produto")
    public ResponseEntity<HttpStatus> deleteTodosProdutos(){
        produtoRepository.deleteAll();

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/produto/{produtoId}/addMaterial/{materialId}")
    public ResponseEntity<Produto> addMaterialToProduto(
            @PathVariable("produtoId") int produtoId,
            @PathVariable("materialId") int materialId,
            @RequestParam("quantidade") int quantidade
    ) {
        Produto produto = produtoRepository.findById(produtoId).orElseThrow();

        Material material = materialRepository.findById(materialId).orElseThrow();

        produto.addMaterial(material, quantidade);
        produtoRepository.save(produto);

        return new ResponseEntity<>(produto, HttpStatus.OK);
    }

    @PostMapping("/produto")
    public ResponseEntity<Produto> createProduto(@RequestBody @NotNull Produto produto) {
        // Save the Produto entity to generate its ID
        Produto savedProduto = produtoRepository.save(produto);

        for (Produto_Materiais produtoMateriais : savedProduto.getProdutosMateriais()) {
            // Fetch existing Material from database by its ID
            Material material = materialRepository.findById(produtoMateriais.getMaterial().getId()).orElse(null);

            // Check if Material exists before associating it with Produto_Materiais
            if (material != null) {
                // Associate the existing Material with Produto_Materiais
                produtoMateriais.setMaterial(material);
                produtoMateriais.setProduto(savedProduto); // Use the savedProduto

                // Save the Produto_Materiais
                produtoMateriaisRepository.save(produtoMateriais);
            }
        }

        return new ResponseEntity<>(savedProduto, HttpStatus.OK);
    }

    @PostMapping("/produto/add-with-materials")
    public ResponseEntity<Produto> addProdutoWithMaterials(@RequestBody Map<String, Object> requestData) {
        // Extract the Produto details and selected materials from the request data
        Map<String, Object> produtoData = (Map<String, Object>) requestData.get("produto");
        List<Map<String, Object>> selectedMaterials = (List<Map<String, Object>>) requestData.get("materiais");

        // Create the Produto entity from the received data
        Produto produto = new Produto();
        String teste = produtoData.get("prodDescricao").toString();
        produto.setDescricao(teste);
        // Set other properties as needed...

        // Save the Produto entity to generate its ID
        Produto savedProduto = produtoRepository.save(produto);

        // Process the selected materials and associate them with the saved Produto
        for (Map<String, Object> materialData : selectedMaterials) {
            int materialId = (int) materialData.get("materialId");
            int quantity = (int) materialData.get("quantity");

            Material material = materialRepository.findById(materialId).orElse(null);

            if (material != null) {
                savedProduto.addMaterial(material, quantity);
            } else {
                // Handle the case where the Material with the provided ID doesn't exist
                // You can log an error or throw an exception
            }
        }

        // Save the updated Produto entity with associated materials
        Produto updatedProduto = produtoRepository.save(savedProduto);

        return new ResponseEntity<>(updatedProduto, HttpStatus.OK);
    }


    
}

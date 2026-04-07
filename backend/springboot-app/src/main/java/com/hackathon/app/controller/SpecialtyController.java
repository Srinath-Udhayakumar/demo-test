package com.hackathon.app.controller;

import com.hackathon.app.dto.response.SpecialtyResponse;
import com.hackathon.app.service.SpecialtyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/specialties")
@RequiredArgsConstructor
public class SpecialtyController {

    private final SpecialtyService specialtyService;

    @GetMapping
    public ResponseEntity<List<SpecialtyResponse>> getAll() {
        return ResponseEntity.ok(specialtyService.getAllSpecialties());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpecialtyResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(specialtyService.getById(id));
    }
}

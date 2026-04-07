package com.hackathon.app.controller;

import com.hackathon.app.dto.request.DoctorRequest;
import com.hackathon.app.dto.response.DoctorResponse;
import com.hackathon.app.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAll(@RequestParam(required = false) String mode) {
        if (mode != null && !mode.isEmpty()) {
            return ResponseEntity.ok(doctorService.getDoctorsByMode(mode));
        }
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getById(id));
    }

    @GetMapping("/specialty/{specialtyId}")
    public ResponseEntity<List<DoctorResponse>> getBySpecialty(
            @PathVariable Long specialtyId,
            @RequestParam(required = false) String mode) {
        return ResponseEntity.ok(doctorService.getDoctorsBySpecialtyAndMode(specialtyId, mode));
    }

    @PostMapping
    public ResponseEntity<DoctorResponse> create(@Valid @RequestBody DoctorRequest request) {
        return ResponseEntity.ok(doctorService.createDoctor(request));
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<DoctorResponse> updateAvailability(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {
        return ResponseEntity.ok(doctorService.updateAvailability(id, body.get("available")));
    }
}

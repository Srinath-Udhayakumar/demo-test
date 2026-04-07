package com.hackathon.app.controller;

import com.hackathon.app.dto.request.AppointmentRequest;
import com.hackathon.app.dto.request.UpdateStatusRequest;
import com.hackathon.app.dto.response.AppointmentResponse;
import com.hackathon.app.entity.User;
import com.hackathon.app.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping
    public ResponseEntity<AppointmentResponse> book(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody AppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.bookAppointment(user.getId(), request));
    }

    @GetMapping("/my")
    public ResponseEntity<List<AppointmentResponse>> myAppointments(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.getMyAppointments(user.getId()));
    }

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> all() {
        return ResponseEntity.ok(appointmentService.getAllAppointments());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AppointmentResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody UpdateStatusRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(appointmentService.updateStatus(id, request, user.getId()));
    }
}

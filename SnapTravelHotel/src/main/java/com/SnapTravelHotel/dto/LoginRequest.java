package com.SnapTravelHotel.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.sql.exec.spi.StandardEntityInstanceResolver;

@Data

public class LoginRequest {

    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "password is required")
    private String password;

}

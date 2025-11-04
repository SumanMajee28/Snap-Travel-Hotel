package com.SnapTravelHotel.service.interfac;

import com.SnapTravelHotel.dto.Response;
import com.SnapTravelHotel.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}

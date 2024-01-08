-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2023 at 03:59 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weddingevent2`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `AdminName` varchar(20) NOT NULL,
  `AdminPassword` varchar(12) NOT NULL,
  `AdminEmail` varchar(30) NOT NULL,
  `AdminPhoneNo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`AdminID`, `AdminName`, `AdminPassword`, `AdminEmail`, `AdminPhoneNo`) VALUES
(1, 'Peach', '123456', 'Peach@email.com', '0654987891'),
(2, 'Rose', '789456', 'Rose@gmail.com', '0345678944'),
(3, 'Jack', 'abcdef', 'Jack@email.com', '0789456123');

-- --------------------------------------------------------

--
-- Table structure for table `availability`
--

CREATE TABLE `availability` (
  `AvailabilityID` int(11) NOT NULL,
  `date` date NOT NULL,
  `IsAvailable` tinyint(1) NOT NULL DEFAULT 0,
  `VenueID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `availability`
--

INSERT INTO `availability` (`AvailabilityID`, `date`, `IsAvailable`, `VenueID`) VALUES
(1, '2023-09-23', 0, 1),
(2, '2023-09-20', 0, 2),
(3, '2023-10-22', 0, 3),
(4, '2023-10-30', 0, 3),
(5, '2023-10-21', 0, 2),
(6, '2023-12-05', 0, 1),
(7, '2023-12-15', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `BookingID` int(11) NOT NULL,
  `BrideName` varchar(50) NOT NULL,
  `GroomName` varchar(50) NOT NULL,
  `BookingDateandTime` datetime NOT NULL,
  `EventDate` date NOT NULL,
  `EventStartTime` time NOT NULL,
  `EventEndTime` time NOT NULL,
  `NumofGuest` int(11) NOT NULL,
  `Details` varchar(100) DEFAULT NULL,
  `CustomerID` int(11) NOT NULL,
  `VenueID` int(11) NOT NULL,
  `MusicID` int(11) NOT NULL,
  `PhotographerID` int(11) NOT NULL,
  `PaymentID` int(11) DEFAULT NULL,
  `StatusID` int(11) DEFAULT 1,
  `AdminID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`BookingID`, `BrideName`, `GroomName`, `BookingDateandTime`, `EventDate`, `EventStartTime`, `EventEndTime`, `NumofGuest`, `Details`, `CustomerID`, `VenueID`, `MusicID`, `PhotographerID`, `PaymentID`, `StatusID`, `AdminID`) VALUES
(1, 'Anna', 'David', '2023-09-23 22:00:07', '2023-10-20', '09:00:00', '17:00:00', 20, 'adafsdfs', 1, 1, 1, 2, 1, 2, 1),
(2, 'Emma', 'James', '2023-09-23 20:23:14', '2023-09-30', '11:00:00', '15:00:00', 50, 'fewfsdfs', 2, 2, 2, 2, 2, 1, NULL),
(3, 'Jena', 'Mark', '2023-10-18 22:25:48', '2023-10-15', '08:00:00', '16:00:00', 30, 'gdfgrgdgf', 3, 3, 3, 4, 3, 3, 3),
(4, 'Janis', 'Joshua', '2023-10-23 23:25:47', '2023-11-30', '07:00:47', '16:00:47', 20, 'adsefsfd', 3, 3, 3, 4, 1, 1, NULL),
(5, 'Kylie', 'Thimothee', '2023-10-21 10:00:52', '2023-11-25', '11:00:52', '18:00:52', 30, ' ดหกดหกเ', 2, 2, 3, 4, 2, 2, 1),
(6, 'Olivia', 'James', '2023-12-23 10:00:13', '2023-11-25', '10:00:13', '16:00:13', 50, 'fsdfewf', 1, 1, 2, 2, 3, 3, 3),
(7, 'Hannah', 'Felix', '2023-12-15 10:01:06', '2023-12-26', '11:00:06', '17:00:06', 30, 'พเกดกเพำ', 3, 2, 3, 4, 1, 4, 3);

--
-- Triggers `booking`
--
DELIMITER $$
CREATE TRIGGER `TotalAmount` AFTER INSERT ON `booking` FOR EACH ROW UPDATE Payment
SET Amount = (
    SELECT SUM(Venue.VenuePrice + Music.MusicPrice + Photographer.PhotographerPrice)
    FROM Booking
    INNER JOIN Venue ON Booking.VenueID = Venue.VenueID
    INNER JOIN Music ON Booking.MusicID = Music.MusicID
    INNER JOIN Photographer ON Booking.PhotographerID = Photographer.PhotographerID
    WHERE Payment.BookingID = Booking.BookingID
)
WHERE Payment.BookingID IS NOT NULL
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustomerID` int(11) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `PhoneNo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustomerID`, `Username`, `Password`, `Email`, `PhoneNo`) VALUES
(1, 'eeeeeeeeee', '111111', 'AA@gmail.com', '0987726347'),
(2, 'David', '789456', 'David@gmail.com', '0345678944'),
(3, 'Somsak', 'abcdef', 'Somsak@email.com', '0789456123'),
(9, 'goy', '$2b$10$jGgstmsxvSn7Gbtnsp7o0OKnurhqww3IbMMCi59D6wg4.xV5uptbO', 'goy111@gmail.com', '0950585256'),
(10, 'nk', '$2b$10$3jiv7Dc5GzHf5nGqzpereeLCe/lhoDWZFZxFda/bwfI3akrhWRyZm', 'namkhing1830@gmail.com', '0950473789');

-- --------------------------------------------------------

--
-- Table structure for table `music`
--

CREATE TABLE `music` (
  `MusicID` int(11) NOT NULL,
  `Genre` varchar(20) NOT NULL,
  `MusicPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `music`
--

INSERT INTO `music` (`MusicID`, `Genre`, `MusicPrice`) VALUES
(1, 'Jazz', 3000),
(2, 'R&B', 2000),
(3, 'Pop', 2500),
(4, 'Blues', 3000),
(5, 'Soul', 3000);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentID` int(11) NOT NULL,
  `PaymentDateandTIme` datetime NOT NULL,
  `Amount` float NOT NULL,
  `MethodNo` int(11) NOT NULL,
  `BookingID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`PaymentID`, `PaymentDateandTIme`, `Amount`, `MethodNo`, `BookingID`) VALUES
(1, '2023-09-20 18:00:37', 20000, 1, 1),
(2, '2023-09-20 22:25:31', 17000, 3, 3),
(3, '2023-11-21 10:00:31', 18500, 3, 5),
(4, '2023-12-05 10:00:48', 19000, 1, 6),
(5, '2023-12-15 10:01:47', 18500, 3, 7);

-- --------------------------------------------------------

--
-- Table structure for table `paymentmethod`
--

CREATE TABLE `paymentmethod` (
  `MethodNo` int(11) NOT NULL,
  `Method` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `paymentmethod`
--

INSERT INTO `paymentmethod` (`MethodNo`, `Method`) VALUES
(1, 'Credit Card'),
(2, 'QR Code'),
(3, 'Mobile Banking');

-- --------------------------------------------------------

--
-- Table structure for table `photographer`
--

CREATE TABLE `photographer` (
  `PhotographerID` int(11) NOT NULL,
  `NumberofPH` varchar(11) NOT NULL,
  `PhotographerPrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `photographer`
--

INSERT INTO `photographer` (`PhotographerID`, `NumberofPH`, `PhotographerPrice`) VALUES
(1, 'ไม่มี', 0),
(2, '1', 2000),
(3, '2', 4000),
(4, '3', 6000),
(5, '4', 8000);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `ReviewNo` int(11) NOT NULL,
  `ReviewDateandTime` datetime NOT NULL,
  `Score` float NOT NULL,
  `Description` varchar(100) DEFAULT NULL,
  `BookingID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`ReviewNo`, `ReviewDateandTime`, `Score`, `Description`, `BookingID`) VALUES
(3, '2023-10-16 10:46:58', 3, 'fgd', 3),
(7, '0000-00-00 00:00:00', 3, 'asdasdasdasd', 7);

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `StatusID` int(11) NOT NULL,
  `Title` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`StatusID`, `Title`) VALUES
(1, 'waiting for payment'),
(2, 'in progress'),
(3, 'finished'),
(4, 'cancel');

-- --------------------------------------------------------

--
-- Table structure for table `venue`
--

CREATE TABLE `venue` (
  `VenueID` int(11) NOT NULL,
  `VenueName` varchar(20) NOT NULL,
  `MaxCapacity` int(11) NOT NULL,
  `VenuePrice` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `venue`
--

INSERT INTO `venue` (`VenueID`, `VenueName`, `MaxCapacity`, `VenuePrice`) VALUES
(1, 'ห้อง 1', 50, 15000),
(2, 'ห้อง 2', 60, 17000),
(3, 'ห้อง 3', 70, 20000),
(4, 'ห้อง 4', 40, 18000),
(5, 'ห้อง 5', 50, 15000),
(6, 'ห้อง 6', 60, 17000),
(7, 'ห้อง 7', 70, 20000),
(8, 'ห้อง 8', 40, 18000),
(9, 'ห้อง 9', 50, 15000),
(10, 'ห้อง 10', 60, 17000),
(11, 'ห้อง 11', 70, 20000),
(12, 'ห้อง 12', 40, 18000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `availability`
--
ALTER TABLE `availability`
  ADD PRIMARY KEY (`AvailabilityID`),
  ADD KEY `fk_venue` (`VenueID`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`BookingID`),
  ADD KEY `fk_CustomerID` (`CustomerID`),
  ADD KEY `fk_AdminID` (`AdminID`),
  ADD KEY `fk_VenueID` (`VenueID`),
  ADD KEY `fk_MusicID` (`MusicID`),
  ADD KEY `fk_PhotographerID` (`PhotographerID`),
  ADD KEY `fk_StatusID` (`StatusID`),
  ADD KEY `fk_PaymentID` (`PaymentID`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Indexes for table `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`MusicID`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentID`),
  ADD KEY `fk_bookingID` (`BookingID`),
  ADD KEY `fk_methodNo` (`MethodNo`);

--
-- Indexes for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  ADD PRIMARY KEY (`MethodNo`);

--
-- Indexes for table `photographer`
--
ALTER TABLE `photographer`
  ADD PRIMARY KEY (`PhotographerID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`ReviewNo`),
  ADD KEY `fk_bookid` (`BookingID`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`StatusID`);

--
-- Indexes for table `venue`
--
ALTER TABLE `venue`
  ADD PRIMARY KEY (`VenueID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `availability`
--
ALTER TABLE `availability`
  MODIFY `AvailabilityID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `BookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `music`
--
ALTER TABLE `music`
  MODIFY `MusicID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `paymentmethod`
--
ALTER TABLE `paymentmethod`
  MODIFY `MethodNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `photographer`
--
ALTER TABLE `photographer`
  MODIFY `PhotographerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `ReviewNo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `StatusID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `venue`
--
ALTER TABLE `venue`
  MODIFY `VenueID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `availability`
--
ALTER TABLE `availability`
  ADD CONSTRAINT `fk_venue` FOREIGN KEY (`VenueID`) REFERENCES `venue` (`VenueID`);

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `fk_AdminID` FOREIGN KEY (`AdminID`) REFERENCES `admin` (`AdminID`),
  ADD CONSTRAINT `fk_CustomerID` FOREIGN KEY (`CustomerID`) REFERENCES `customer` (`CustomerID`),
  ADD CONSTRAINT `fk_MusicID` FOREIGN KEY (`MusicID`) REFERENCES `music` (`MusicID`),
  ADD CONSTRAINT `fk_PaymentID` FOREIGN KEY (`PaymentID`) REFERENCES `payment` (`PaymentID`),
  ADD CONSTRAINT `fk_PhotographerID` FOREIGN KEY (`PhotographerID`) REFERENCES `photographer` (`PhotographerID`),
  ADD CONSTRAINT `fk_StatusID` FOREIGN KEY (`StatusID`) REFERENCES `status` (`StatusID`),
  ADD CONSTRAINT `fk_VenueID` FOREIGN KEY (`VenueID`) REFERENCES `venue` (`VenueID`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `fk_bookingID` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`),
  ADD CONSTRAINT `fk_methodNo` FOREIGN KEY (`MethodNo`) REFERENCES `paymentmethod` (`MethodNo`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_bookid` FOREIGN KEY (`BookingID`) REFERENCES `booking` (`BookingID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

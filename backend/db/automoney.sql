
CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `account_name` varchar(255) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `iore` (
  `track_id` int(11) NOT NULL,
  `date` varchar(255) NOT NULL,
  `types` varchar(255) NOT NULL,
  `account_id` int(255) NOT NULL,
  `category_id` int(255) DEFAULT NULL,
  `amount` float NOT NULL,
  `note` text NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `transfer` (
  `transfer_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `from_account_id` int(255) NOT NULL,
  `to_account_id` int(255) NOT NULL,
  `amount` float NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthday` text DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `profile_img` varchar(400) NOT NULL DEFAULT 'https://res.cloudinary.com/draadlugd/image/upload/v1761539481/h0hlb3dvrkkeazrlt77y.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

ALTER TABLE `account`
  ADD PRIMARY KEY (`account_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `iore`
  ADD PRIMARY KEY (`track_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `transfer`
  ADD PRIMARY KEY (`transfer_id`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `account`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `iore`
  MODIFY `track_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

ALTER TABLE `transfer`
  MODIFY `transfer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `category`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `iore`
  ADD CONSTRAINT `iore_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

ALTER TABLE `transfer`
  ADD CONSTRAINT `transfer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

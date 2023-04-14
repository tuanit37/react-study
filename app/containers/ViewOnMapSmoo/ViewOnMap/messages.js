/*
 * ViewOnMap Messages
 *
 * This contains all the text for the ViewOnMap container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ViewOnMapCommon';
export default defineMessages({
  viewOnMap: {
    id: `${scope}.viewOnMap`,
    defaultMessage: 'Xem trên bản đồ',
  },
  filterBy: {
    id: `${scope}.filterBy`,
    defaultMessage: 'Lọc chỗ nghỉ theo',
  },
  rating: {
    id: `${scope}.rating`,
    defaultMessage: 'Xếp hạng',
  },
  amenities: {
    id: `${scope}.amenities`,
    defaultMessage: 'Tiện nghi',
  },
  clear: {
    id: `${scope}.clear`,
    defaultMessage: 'Xóa',
  },
  searchByPropertyName: {
    id: `${scope}.searchByPropertyName`,
    defaultMessage: 'Tìm kiếm theo tên nơi lưu trú',
  },
  searchPlace: {
    id: `${scope}.searchPlace`,
    defaultMessage: 'Tìm kiếm địa điểm',
  },
  viewRoom: {
    id: `${scope}.viewRoom`,
    defaultMessage: 'Xem chi tiết',
  },
  statusError: {
    id: `${scope}.statusError`,
    defaultMessage: 'Xin lỗi, chúng tôi không tìm thấy chỗ nghỉ phù hợp nào',
  },
  statusFollow: {
    id: `${scope}.statusFollow`,
    defaultMessage: 'Vui lòng tìm kiếm lại theo các cách sau',
  },
  zoomInMap: {
    id: `${scope}.zoomInMap`,
    defaultMessage: 'Phóng to bản đồ',
  },
  lookOtherLocation: {
    id: `${scope}.lookOtherLocation`,
    defaultMessage: 'Tìm kiếm một địa điểm khác',
  },
  pricePerNight: {
    id: `${scope}.pricePerNight`,
    defaultMessage: 'Giá mỗi đêm',
  },
  totalAmount: {
    id: `${scope}.totalAmount`,
    defaultMessage: 'Tổng thanh toán',
  },
  fromTheCenter: {
    id: `${scope}.fromTheCenter`,
    defaultMessage: 'cách trung tâm',
  },
  hotelsOther: {
    id: `${scope}.hotelsOther`,
    defaultMessage: 'Các chỗ nghỉ phù hợp khác',
  },
  outOfRoom: {
    id: `${scope}.outOfRoom`,
    defaultMessage: 'Hết phòng',
  },
  updatingPrice: {
    id: `${scope}.updatingPrice`,
    defaultMessage: 'Đang cập nhật giá',
  },
});

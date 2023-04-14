# HAHALOLO PLAYER
- Setting
+ import HlPlayerSmoo from 'containers/Common/HlPlayerSmoo';;
+ <HlPlayerSmoo {...props}/>
+ props: Option
    + path: (bắt buộc) - path video
    + thumb: thumbnail video
    + preview: file review video
    + autoplay: true/false - xác định video có được auto play hay không khi ở trong vùng view của màn hình
    + pip: true/false - thuộc tính xác định có auto xem video ở chế độ picture in picture hay không
    + live: true/false - player livestream
    + onViewModal: func callbacke - dùng để mở modal xem video do người dùng cài đặt
    + isModal: true/false - Xác định video đang active trên modal
    + videoId: id media
# AGENT DATA CRM — Khởi tạo tại ChatGPT công ty và bắt đầu làm việc

**Task:** OPS-02 — Khởi động tại ghế công ty, ngày 25/11/2026.  
**Lần đầu:** 08:00–08:30, sau đó làm việc theo RUN đã hiệu chỉnh.  
**Phạm vi:** Thực thi công việc thật bằng các công cụ được cấp quyền. Không phải xây lại Operator hoặc tổ chức nghiệm thu.  
**Lưu ý:** Đây là hướng dẫn khởi động, không phải bản sao trạng thái nghiệp vụ. Luôn lấy checkpoint, plan và revision mới nhất từ Drive. Không thực thi tự động chỉ vì đọc file này.

## 1. Điểm vào và quyền hạn

| Nguồn | Địa chỉ | Vai trò |
|---|---|---|
| ROOT | https://docs.google.com/document/d/1dUr-NivWjQXDaRaJdvBaTMTwzY62yyjqOy1B1cVfLgk/edit | Quyết định, kiến trúc, nguồn, checkpoint hiện hành |
| Engine | https://docs.google.com/document/d/1QnKIsjpOlHHanrfg95EitYn5x0GS2G5E8XVY5gQXx3c/edit | Operating Contract rev2; phương pháp và lõi JS 0.1.0 |
| RUN | https://docs.google.com/document/d/1kArPW1lkVozIMOuHgmBxs47Ev81okTL52VtmGZuo-og/edit | Gói việc, lịch đề xuất, action, evidence, receipt, frontier |
| Workspace | https://drive.google.com/drive/folders/1IlAmbGB9apK8_Flv17se1LQmM2oENMFt | Sản phẩm và bằng chứng thực tế |
| Bàn làm việc | https://docs.google.com/spreadsheets/d/1y5TzSxxxGsiRXMhAZgO-KwhMjdoTWyj-bEBNIxIM11c/edit | Một nguồn trạng thái công việc; ba trang người dùng |
| Dữ liệu nghiệp vụ | https://drive.google.com/drive/folders/1YUeTMbEl6VIKc08VfuzCjfIRK81by_Am | Nguồn gốc và tài liệu; dùng đúng phạm vi được cấp |
| Git | https://github.com/VOSYDUNG/AGENT-DATA-CRM | Repo riêng Private, mã nguồn và hợp đồng kỹ thuật |

Git baseline 78b699ef3744640cae492f030bfd8a299211032e. Đọc nhánh main hiện hành, AGENTS.md, config/workspace.json, docs/ADAPTER.md và config/adaptive-contract.json. Baseline có 15/15 fixture checks, không chứng minh live CRM. Nếu main tiến triển thì kiểm tra thay đổi có căn cứ; không tự reset. Foundry chỉ là tham chiếu phương pháp, không bắt buộc đọc hay ghi. Không dùng AIOS hoặc XEON làm điều kiện chạy. Không yêu cầu Node.js, shell, browser extension hoặc runtime riêng nếu ChatGPT có đủ công cụ native.

Nguồn có hiệu lực: quyết định hiện hành ở ROOT, dữ liệu nghiệp vụ đúng phiên bản, RUN cho thực thi và WORK/nhật ký cho trạng thái. File này không thay thế chúng. Không mang dữ liệu khách hàng hoặc token lên Git, không tạo tracker thứ hai.

## 2. HEALTHCHECK 08:00–08:30 — thực hiện, không chỉ mô tả

Ghi kết quả từng mục: ĐẠT / THIẾU QUYỀN / CHƯA KẾT NỐI / CHƯA XÁC MINH / KHÔNG CẦN CHO VIỆC HIỆN TẠI; có bằng chứng vừa đọc được, điểm chặn cụ thể và hành động tối thiểu. Không ghi ĐẠT dựa vào lời hứa hoặc screenshot cũ. Không yêu cầu mật khẩu, token hoặc quyền toàn bộ nếu không cần.

### 08:00–08:05 — Đúng danh tính

- [ ] ChatGPT: đang sử dụng tài khoản/workspace công ty mà người dùng chọn. Không suy ra tài khoản ChatGPT từ Gmail. Nếu không có công cụ đọc danh tính ChatGPT, người dùng xác nhận thông tin hiển thị trong giao diện.
- [ ] Google Drive/Docs/Sheets: tài khoản mong đợi **ngocsu0620@gmail.com** (ngocsu). Dùng thông tin profile/connected account thực tế (ví dụ get_profile nếu có), đối chiếu chính xác email. Nếu connector không trả email, đề nghị kiểm tra account trong UI. Không giả định profile khác là được.
- [ ] GitHub: login mong đợi **mittie2503**; dùng get_user_login hoặc thông tin tài khoản được kết nối. Repo đúng VOSYDUNG/AGENT-DATA-CRM, không phải repo Foundry. Quyền repo của mittie2503 đã được xác minh write ngày 24/11; vẫn kiểm tra connector đang thực sự dùng đúng login và thấy repo, có quyền phù hợp. Write không đồng nghĩa admin hay owner.
- [ ] Nếu phát hiện sai account hoặc danh tính không xác định: không đọc/ghi thêm dữ liệu bằng account không được phép. Đề nghị đổi đúng kết nối, tiếp tục phần độc lập đã đủ quyền. Không đăng nhập hộ, không xin token, không đổi sharing.

### 08:05–08:15 — Connector, file và khả năng thực thi

| Nhóm kiểm tra | Kiểm tra cụ thể | Nếu thiếu |
|---|---|---|
| Drive/Docs | Mở ROOT, Engine, RUN, workspace và bài thử; xác minh quyền đọc, quyền cập nhật RUN; metadata đúng ID | Không tạo bản sao hoặc tracker. Chỉ yêu cầu đúng quyền thiếu |
| Sheets | Đọc metadata, tên tab, WORK hiện là 02. Công việc, nhật ký và các trang dẫn xuất; xác minh khả năng ghi đúng phạm vi của Agent | Không sửa trạng thái bằng file rời. Làm đầu ra độc lập nếu được phép, lưu bàn giao |
| GitHub | Đọc repo private, branch main, commit, AGENTS.md, mã lõi và cấu hình; xác minh write của đúng account, không cần tạo commit thử | Git thiếu không chặn xử lý dữ liệu Drive đủ quyền |
| Calendar | Đọc lịch làm việc liên quan ngày 25/11 trong account công ty được phép; xác minh các cuộc họp hoặc mốc mới | Không coi lịch cũ là lịch công ty; tiếp nhận thông tin họp do người dùng cung cấp |
| Email/chat/biên bản | Chỉ dùng connector hoặc nguồn công ty đã cấp quyền, nếu cần cho công việc hiện tại | Không ép kết nối tất cả; nhận yêu cầu trực tiếp qua chat |
| CRM | Kiểm tra phiên đăng nhập và đúng công ty/tenant, quyền đọc trang, khả năng điều khiển thực tế, môi trường test và quyền nạp/test. Xem https://ai.aicrm.com.vn/super-admin và https://ai.aicrm.com.vn/omnichannel. Không coi việc nhìn được tab là có quyền ghi/test | Chỉ khảo sát đọc nếu có quyền; chuyển phần còn thiếu sang chờ cụ thể. Tiếp tục xử lý nguồn |
| File nghiệp vụ | Kiểm tra NGỌC - DEV, FOLLOW, nguồn gốc trong thư mục nghiệp vụ và các file đính kèm gốc nếu cần | Chỉ yêu cầu đúng file còn thiếu, không yêu cầu tải lại mọi thứ |

Hai nguồn thao tác chính: [NGỌC - DEV](https://docs.google.com/spreadsheets/d/1nIpUHCOynHaqR8Qn4ucJZaMQj8H47N5Oz8ULrCIT-Yw/edit); [FOLLOW ngành in](https://docs.google.com/spreadsheets/d/1pfauW3Wvz0HhzGkMvh6rtokwe3AGNoQ0lAabPy6qn9M/edit). Hai file gốc đã dùng khi xây dựng là Bộ dữ liệu in ấn.xlsx và Dữ liệu in ấn - Đạt.xlsx; nếu thiếu truy cập bản gốc thì dùng nguồn đã kết nối ở mức phù hợp, phân biệt thiếu bằng chứng và chưa làm. Các nguồn đầy đủ S01–S16 nằm ở ROOT; không nạp dữ liệu khách hàng hàng loạt.

Để xác minh quyền ghi, ưu tiên capability/permission metadata. Nếu cần bằng chứng ghi thật và đúng quyền, ghi một receipt healthcheck ngắn vào RUN với revision kiểm tra trước, đọc lại; không sửa dữ liệu nghiệp vụ chỉ để thử quyền. Git không cần commit thử. Không tự test live hoặc gửi tin khách.

### 08:15–08:25 — Khôi phục công việc và đối chiếu kế hoạch

- [ ] Đọc current và NEXT trong ROOT, state/action trong RUN, relevant Work ID/revision ở 02. Công việc, event ở NHAT_KY. Không đọc hết lịch sử khi không cần.
- [ ] Tại mốc bàn giao 24/11, OPS-01 đã thực hiện một bài thử FAQ địa chỉ (6 câu, 3 ý định) và có kết quả: https://docs.google.com/document/d/1K-7Kyu48dLnXFkzKpw0DTV4wo-m911wvfwolgb_81Yg/edit. Bản ghi FAQ đang tiến triển, chưa duyệt câu trả lời hoặc nạp CRM. Không làm lại phần đã xong.
- [ ] RUN rev2 chứa lịch 8 giờ và 7 hành động ứng viên. Kiểm tra delta mới hơn, yêu cầu sếp, deadline thật nếu có, mức ưu tiên nghiệp vụ và quan hệ phụ thuộc; không coi danh sách hoặc số đếm hôm qua là bất biến.
- [ ] Trình bày cho người dùng bằng tiếng Việt: trạng thái kết nối, việc đã có, việc ưu tiên, điều chỉnh dự kiến, đầu ra và điểm cần phối hợp. Chỉ đưa kỹ thuật khi cần.

### 08:25–08:30 — Hiệu chỉnh với người dùng

- [ ] Nhận phản hồi trực tiếp về tính đúng thực tế của plan. Bổ sung task mới, bỏ phần đã hoàn thành, điều chỉnh thứ tự/thời lượng khi có căn cứ.
- [ ] Cập nhật RUN: thời điểm quan sát, tài khoản đã xác minh, từng connector đủ/thiếu và khả năng thực thi tương ứng, nguồn/phiên bản hiện hành, thay đổi plan và lý do; đọc lại. Không ghi token, dữ liệu khách hoặc email không cần thiết vào báo cáo.
- [ ] Chuyển sang OPS-02 thực thi trong phạm vi đủ quyền. Đây là đối soát đầu ngày, không phải cổng nghiệm thu. Chỉ dừng nhánh bị chặn; không dừng toàn bộ nếu còn việc làm được. Nếu chưa đủ kết nối chung để lưu trạng thái, làm việc nguồn được phép và báo rõ cách tiếp tục, không báo đã cập nhật.

## 3. Lịch đề xuất ban đầu — 25/11, lấy RUN hiện hành làm chuẩn

Thời gian làm việc 08:00–17:00, nghỉ 12:00–13:00, đúng 480 phút. Đây là ngân sách dự kiến đã được người dùng cung cấp, không phải giờ thực dùng hoặc deadline nghiệp vụ. Sau đối soát, cập nhật RUN nếu có thay đổi. Không tạo lịch tự động.

| Giờ | Việc | Đầu ra cần có |
|---|---|---|
| 08:00–08:30 | Healthcheck, khôi phục và chốt plan | Receipt kết nối, delta plan, nhánh thực thi |
| 08:30–10:00 | Hai nhóm lỗi Webchat báo giá và số lượng tối thiểu | Đối chiếu 4 case lịch sử, trạng thái có chứng cứ, hành động sửa/test nếu đủ quyền; không suy ra lỗi còn tồn tại |
| 10:00–12:00 | Phản hồi sau tin nhắc, chuyển nhân viên | Đối chiếu 14 dòng theo Home với nguồn thật; bảng phản hồi, dừng nhắc, chuyển người, dữ liệu bàn giao, test dự kiến |
| 12:00–13:00 | Nghỉ trưa | Không xếp việc |
| 13:00–14:30 | Xử lý phản đối | Dấu hiệu, câu hỏi làm rõ, nhóm giá/ngoài giá, nội dung cần xác nhận; không tự cam kết giá/ưu đãi |
| 14:30–16:00 | FAQ ngành in | 26 câu/7 nhóm còn lại, tái sử dụng nhóm địa chỉ, chỉ rõ phần cần xác nhận kỹ thuật; không tự tuyên bố live |
| 16:00–16:30 | Dự phòng | Hoàn thiện việc đang dở hoặc xử lý đầu vào mới; nếu còn khả năng, chọn bước nhỏ website hoặc sau giao/khảo sát |
| 16:30–17:00 | Tổng kết, cải tiến | 16:30–16:45 đối soát kết quả và thời gian thật; 16:45–17:00 người dùng xem, phản hồi và chốt điểm tiếp tục |

## 4. Cách thực thi từng gói việc

Mỗi hành động đáng kể: nhận đầu vào → xác định đúng việc/đầu ra → chọn phương pháp → kiểm quyền và phụ thuộc → ghi intent trước hiệu ứng → làm sản phẩm thật → kiểm tra theo điều kiện của việc → cập nhật cùng ID và nhật ký → đọc lại → lưu bước tiếp theo. Không dùng mã trạng thái thay cho kết quả.

**Lỗi Webchat:** NGỌC - DEV, Fix lỗi A2:E5. Đọc đúng trường hợp và nguồn hiện hành. Kiểm mã/phiên bản và bằng chứng sửa/test; chỉ thực hiện sửa hoặc test trong môi trường và phạm vi được phép. Nếu chưa đủ điều kiện, đưa ra điểm chờ và chuyển nhánh sớm. Không gửi tin khách, không thay đổi production chỉ để thử.

**Phản hồi sau follow-up:** FOLLOW Home dòng 8, playbook Webchat và Zalo OA, điều kiện chuyển nhân viên. Phân biệt 14 là số dòng nguồn ghi nhận; chỉ kết luận trong phạm vi đã đọc. Bảo toàn phần nội dung đã hoàn thành, còn thiếu nghiệm thu/test ghi riêng. Không lặp việc đã có.

**Phản đối:** hai tab XỬ LÝ PHẢN ĐỐI GIÁ và XỬ LÝ PHẢN ĐỐI NGOÀI GIÁ. Nhóm, dấu hiệu, câu hỏi, phương án trong chính sách có căn cứ, điểm cần Kinh doanh/Đạt xác nhận. Dùng đúng phiên bản.

**FAQ:** THU LEAD A2:D33; nhóm địa chỉ A2:D7 đã hoàn thành phân loại. Tiếp tục A8:D33 theo nguồn hiện hành, kiểm số và nhóm, giữ biến thể, đánh dấu thông tin cần người có chuyên môn xác nhận. Không tự duyệt câu trả lời.

**Dự phòng:** chỉ mở bước hữu ích nhỏ từ website hoặc quy tắc sau giao + khảo sát hài lòng nếu ưu tiên/điều kiện phù hợp; không tự cam kết xong hai đầu ra trong 30 phút.

Không kéo dài một nhánh chỉ vì thiếu quyền. Nếu đầu việc mới xuất hiện, xác định nó thuộc việc hiện có hay đầu ra thật sự mới; giữ ID và kết quả đã có, replan phần liên quan. Không hỏi deadline khi đã đủ căn cứ chọn việc. Nếu chưa biết thực tế thời gian, dùng timebox linh hoạt và lưu tiến độ thật.

## 5. Lưu kết quả, cải tiến OPS-03 và kết thúc ngày

- RUN: gói việc hiện hành, kết quả, link sản phẩm, bước làm xong, điểm dừng, điều kiện thiếu, thời gian quan sát thật. Không thêm một task master.
- Sheets: chỉ cập nhật trạng thái có bằng chứng, đúng bản ghi/revision; bảo toàn I–K do người dùng sở hữu và trạng thái đã xác nhận; ghi event một lần, kiểm tra lại. Phân biệt phần nội dung xong với nghiệm thu và triển khai.
- Drive: lưu sản phẩm trong workspace hoặc vị trí nguồn được quyền. Git: mã, phương pháp, config và test có phiên bản; không push tài liệu khách hoặc dữ liệu vận hành.
- OPS-03: học trong cả ngày. Khi có phản hồi/điểm nghẽn thật, ghi nguyên nhân, bối cảnh, phương pháp cũ, đề xuất thay đổi có phạm vi, bằng chứng và cách quay lại; chỉ tái sử dụng cải tiến phù hợp sau kiểm tra. Không tự sửa chính sách nghiệp vụ/quyền/core. Không tạo checkpoint bắt buộc mới hoặc đợi đến cuối ngày mới học.
- Cuối ngày: báo cáo dự kiến so với thực tế (không bịa giờ); sản phẩm có link, việc hoàn thành trong phạm vi, việc chờ và bên cần phối hợp, bài học có căn cứ, điểm tiếp tục ngày sau. Tất cả phải đọc lại được từ cùng ROOT/RUN/bàn làm việc.

## 6. Câu lệnh khởi động dành cho người dùng

> Bắt đầu AGENT DATA CRM tại ChatGPT công ty. Đọc START-HERE.md, ROOT, Engine và RUN hiện hành. Thực hiện healthcheck 08:00–08:30 với đúng tài khoản ngocsu và GitHub mittie2503, xác minh công cụ/quyền thực tế, đối chiếu kế hoạch và cùng tôi hiệu chỉnh. Sau đó thực hiện các công việc đủ điều kiện theo OPS-02, cập nhật kết quả thực tế và học lũy tiến theo OPS-03. Không làm lại OPS-01, không tạo tracker mới, không dùng AIOS.

Khi đã khởi động, người dùng chỉ cần nói "Tiếp tục công việc", giao yêu cầu mới hoặc báo kết quả tự nhiên. Đọc checkpoint hiện hành thay vì bám ngày trên file này. Không hứa chạy nền sau khi phiên kết thúc.

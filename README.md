# AGENT DATA CRM

Bộ điều phối tiếp nhận công việc công ty thuộc trách nhiệm của người sử dụng. Mỗi việc tiếp tục ở nguồn được giao và theo quyền của người phụ trách. Git giữ mã và hợp đồng kỹ thuật.

## Tiếp tục công việc

Đọc [hướng dẫn khởi động](START-HERE.md), rồi mở phần đang có hiệu lực trong ROOT và RUN trên Drive. Agent tự kiểm quyền cần cho việc trước mắt, đọc phần đã làm và chọn bước tiếp theo theo yêu cầu thực tế. Với việc CRM, mở dòng trong sheet nhóm để soạn hoặc kiểm trạng thái. Hôm nay và Tổng quan là các trang dẫn xuất.

## Kỹ thuật

- Core JavaScript 0.1.0: giữ đúng hàm createEngine từ tài liệu Engine, thêm CommonJS export để sử dụng trong host có Node.js.
- Operating contract rev2: intake linh hoạt, thực thi có chứng cứ, lập lại kế hoạch theo sự kiện, học và cải tiến theo phạm vi.
- `config/adaptive-contract.json`: chính sách máy đọc cho AI/controller, không phải runtime daemon.
- `docs/ADAPTER.md`: giao diện kết nối công cụ thật, giới hạn và điều kiện cập nhật.
- `AGENTS.md`: cách tiếp tục, phân quyền, lưu trạng thái và tránh làm trùng.
- Kiểm tra cục bộ với Node.js 18 trở lên: `npm test` (không cần thư viện bên ngoài). Bộ kiểm tra dùng fixture/adapter giả lập; không chứng minh nạp CRM hay chạy thật ở tài khoản công ty.

ChatGPT có thể thực thi trực tiếp bằng công cụ native theo cùng contract, không cần cài Node, không cần máy cá nhân. Core không có adapter Google/CRM tự động hoặc scheduler. Không chạy nền. Không lưu token, thông tin khách hàng, dữ liệu ERP/CRM hoặc file môi trường chứa bí mật vào repo.

## Nguồn phương pháp

R1/R2 dùng phiên bản phương pháp tương ứng NNC OSER 5.1.0-alpha.4. [Thông báo phương pháp đã ghim](docs/SHIN-METHOD-UPDATE-20261127.md) dẫn tới bản nguồn và hướng dẫn dùng khi ghế hiện tại chỉ có quyền đọc tài liệu của dự án.

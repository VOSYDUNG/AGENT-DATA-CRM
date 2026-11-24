# AGENT DATA CRM

Dự án độc lập. Native AI host thực thi theo quyền thực tế, Drive giữ trạng thái và đầu ra. Foundry chỉ là tài liệu tham chiếu R1/R2; không phải repository cha hay nơi thực thi. Không sử dụng AIOS.

## Bắt đầu ở ChatGPT công ty

**Lần đầu trên tài khoản công ty:** đọc [START-HERE.md](START-HERE.md), thực hiện healthcheck 08:00–08:30, đối soát kế hoạch với người dùng rồi tiếp tục checkpoint hiện hành trong ROOT/RUN. Không dùng ngày trên file làm trạng thái vĩnh viễn.

Đọc [ROOT](https://docs.google.com/document/d/1dUr-NivWjQXDaRaJdvBaTMTwzY62yyjqOy1B1cVfLgk/edit) trước; đọc [Engine](https://docs.google.com/document/d/1QnKIsjpOlHHanrfg95EitYn5x0GS2G5E8XVY5gQXx3c/edit) và [RUN](https://docs.google.com/document/d/1kArPW1lkVozIMOuHgmBxs47Ev81okTL52VtmGZuo-og/edit) theo chỉ dẫn. Yêu cầu "Bắt đầu ngày làm việc. Đọc trạng thái hiện hành và tự thực hiện phần có thể làm." Không giả định quyền tài khoản cũ. Kế thừa checkpoint mới nhất trên Drive, không coi ngày hoặc trạng thái trong Git là hiện hành.

[Workspace](https://drive.google.com/drive/folders/1IlAmbGB9apK8_Flv17se1LQmM2oENMFt) chứa đầu ra và gói việc. [Bàn làm việc](https://docs.google.com/spreadsheets/d/1y5TzSxxxGsiRXMhAZgO-KwhMjdoTWyj-bEBNIxIM11c/edit) chỉ phục vụ quan sát và đầu vào tùy chọn. Không sao chép tracker hay dữ liệu nghiệp vụ vào Git.

## Kỹ thuật

- Core JavaScript 0.1.0: giữ đúng hàm createEngine từ tài liệu Engine, thêm CommonJS export để sử dụng trong host có Node.js.
- Operating contract rev2: intake linh hoạt, thực thi có chứng cứ, lập lại kế hoạch theo sự kiện, học và cải tiến theo phạm vi.
- `config/adaptive-contract.json`: chính sách máy đọc cho AI/controller, không phải runtime daemon.
- `docs/ADAPTER.md`: giao diện kết nối công cụ thật, giới hạn và điều kiện cập nhật.
- `AGENTS.md`: cách tiếp tục, phân quyền, lưu trạng thái và tránh làm trùng.
- Kiểm tra cục bộ với Node.js 18 trở lên: `npm test` (không cần thư viện bên ngoài). Bộ kiểm tra dùng fixture/adapter giả lập; không chứng minh nạp CRM hay chạy thật ở tài khoản công ty.

ChatGPT có thể thực thi trực tiếp bằng công cụ native theo cùng contract, không cần cài Node, không cần máy cá nhân. Core không có adapter Google/CRM tự động hoặc scheduler. Không chạy nền. Không lưu token, thông tin khách hàng, dữ liệu ERP/CRM hoặc file môi trường chứa bí mật vào repo.

## Nguồn phương pháp

[Foundry R1/R2 đã cố định phiên bản](https://github.com/VOSYDUNG/Shin-Operator-Foundry/tree/c777cb055a7f3a44e862541bfb4e35d02984f7d2) — chỉ tham chiếu, không thay đổi hoặc phụ thuộc quyền đọc repo đó để bắt đầu.

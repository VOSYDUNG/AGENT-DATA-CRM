# AGENT DATA CRM — thông báo cập nhật phương pháp

Ngày 27/11/2026. Hình thức: thông báo phương pháp để phiên chủ đọc và tự cập nhật.

Khôi phục theo `AGENTS.md` và `START-HERE.md`, sau đó đọc ROOT/Engine/RUN hiện hành bằng tài khoản và công cụ đã được cấp. Phiên sở hữu CRM tự đối chiếu phần đã áp dụng R1/R2 với thay đổi phương pháp dưới đây; ghi kết quả ở đúng nguồn hiện có.

Drive tiếp tục là nguồn hiện hành cho công việc nghiệp vụ, quyết định, gói thực thi và đầu ra. Git tiếp tục giữ code và hợp đồng kỹ thuật. Thông báo không đổi pin trong `config/adaptive-contract.json`, không tạo tracker mới và không thực hiện ghi dữ liệu nghiệp vụ.

## Cách phiên chủ nhận và áp dụng

1. Khôi phục đúng entry, nguồn hiện hành, quyền và checkpoint của công việc đang làm; giữ kết quả đã chấp nhận và trạng thái chưa biết.
2. Khi brief hoặc tiêu chí còn thiếu, tiếp tục nghiên cứu, làm rõ hay prototype trong phạm vi đã được giao. Chốt đủ Mission/acceptance trước phần thực thi có hệ quả cần ràng buộc; không biến R1 thành cổng chặn mọi hoạt động Formation.
3. Chỉ cập nhật phần kế hoạch/phương pháp chịu ảnh hưởng. Giữ lịch sử và liên kết nguồn; không viết lại quyết định nghiệp vụ hay kết quả cũ để làm cho bản mới trông đúng.
4. Kiểm tra đúng đầu ra với nguồn và evaluator phù hợp, theo mức rủi ro thực tế. Technical pass, nghiệm thu của owner và hiệu quả sử dụng là các bằng chứng riêng; ghi rõ phần chưa kiểm.
5. Dùng task/cursor/owner hiện có. Nhánh độc lập còn được phép thì tiếp tục khi nhánh khác đang chờ; với tác động có kết quả chưa rõ, kiểm lại trước khi thử lại.
6. Tách phương pháp, version package, môi trường host và checkpoint từng công việc. Host chỉ cung cấp môi trường/capability; không tự trở thành owner của mọi dự án chạy bên trong.
7. Tách năng lực cá nhân, vai được giao, dữ liệu tổ chức và công việc đối tác theo nguồn/quyền của từng việc; sự giống nhau giữa các môi trường không tạo quyền dùng chung dữ liệu.

## Ghi nhận tại nguồn đang dùng

Phiên chủ ghi ngắn vào checkpoint/handoff hiện có: nguồn đã đọc; phần phù hợp và thay đổi đã thực hiện; bằng chứng kiểm tra; phần giữ nguyên/chưa áp dụng; bước tiếp theo và owner. Không cần một ledger hay biểu mẫu bắt buộc mới.

Phân biệt **đã gửi**, **phiên đã đọc**, **đã áp dụng**, và **đã kiểm chứng trong việc thật**. File có mặt chỉ chứng minh đã gửi. Thông báo không tự đánh thức phiên hoặc cấp quyền mới.

## Nguồn đã ghim

- [Phương pháp Shin tại revision đã ghim](https://github.com/VOSYDUNG/Shin-Operator-Foundry/tree/dad393eeb02ba8fd295d906ba6c7d6fb061e7921) — `dad393eeb02ba8fd295d906ba6c7d6fb061e7921`.
- [Gói thông báo nhận phương pháp](https://github.com/VOSYDUNG/Shin-Operator-Foundry/blob/6ff3b665dfa1e798eb7f383f9a594bbcc005db0a/handoff/SHIN-PROJECT-METHOD-UPDATE-20261127.md) — tài liệu phân phối ngày 27/11/2026.

Nguồn ở trên có quyền truy cập riêng. Nếu phiên không đọc được, ghi rõ giới hạn và tiếp tục với nguồn dự án được cấp; không coi link là bằng chứng đã đọc và không công khai nội dung riêng để vượt giới hạn đó. Phần tóm tắt trong thông báo này là đầu vào đối chiếu, không thay thế nguồn/quyền hiện hành.

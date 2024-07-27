document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        displayEventTime: false,

        events: [
            {
                title: "허닭",
                start: "2024-07-22",
                end: "2024-07-28T23:59:00",
                extendedProps: {
                    url: "http://www.heodak.com"
                }
            },
            {
                title: "likelion",
                start: "2024-07-22T10:00:00",
                end: "2024-07-27T18:00:00",
                backgroundColor: '#ff9f89',
                borderColor: '#ff9f89',
                textColor: '#ffffff',
                extendedProps: {
                    url: "https://likelion.university"
                }
            }
        ],
        
        eventClick: function(info) {
            var eventUrl = info.event.extendedProps.url; // URL 속성 접근

            if (eventUrl) {
                window.location.href = eventUrl; // 현재 탭에서 링크 열기
                info.jsEvent.preventDefault(); // 기본 동작 방지
            }
        }
    });
    calendar.render();
});

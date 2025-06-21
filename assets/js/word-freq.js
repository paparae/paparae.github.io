let text = "";

const stopwords = [
    "the", "and", "to", "in", "of", "a", "for", "with",
    "on", "this", "that", "it", "which", "an", "from",
    "they", "by", "its", "is", "as"
];

const ctx = document.getElementById('myChart')

const chart = new Chart(ctx, {
    "type": "bar",
    "data": {},
    "options": {
        "responsive": true
    }
})

// 입력창에 텍스트를 입력받아 차트 데이터를 업데이트하는 함수
function updateChart() {
    text = document.getElementById('textInput').value;  // 저장
    chart.data = getChartData(text);
    chart.update();
}

// {단어: 빈도} 꼴의 객체를 받아서 chartData 객체를 돌려주는 함수
function getChartData(text, topn=30) {
    // 단어 배열 만들기
    const words = text.toLowerCase().match(/[a-z가-힣]+/g) || [];
    //카운터 객체 만들기
    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    })

    for (stop of stopwords) {
        frequency[stop] = 0;
    }

    const sorted = Object.entries(frequency).sort(([,a],[,b]) => b - a);
    //상위 30개
    const freq_sorted = Object.fromEntries(sorted.slice(0, topn));
    //차트용 데이터 만들
    const chartData = {
        "labels": Object.keys(freq_sorted),
        "datasets": [
            {
                "label": "Frequency",
                "data": Object.values(freq_sorted)
            }
        ]
    };

    return chartData;

};

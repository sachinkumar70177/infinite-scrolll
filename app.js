document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("data-container");
    const loading = document.getElementById("loading");
    let page = 1;
    let isLoading = false;

    // Function to simulate fetching data from an API
    function fetchData(page) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = [];
                for (let i = 1; i <= 10; i++) {
                    data.push(`Item ${i + (page - 1) * 10}`);
                }
                resolve(data);
            }, 1000);
        });
    }

    // Function to append new items to the container
    function appendItems(items) {
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item';
            div.textContent = item;
            container.appendChild(div);
        });
    }

    // Function to handle scroll events
    function onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
            isLoading = true;
            loading.style.display = 'block';
            page++;
            fetchData(page).then(data => {
                appendItems(data);
                isLoading = false;
                loading.style.display = 'none';
            });
        }
    }

    // Load initial data
    fetchData(page).then(data => {
        appendItems(data);
    });

    // Attach scroll event listener
    window.addEventListener('scroll', onScroll);
});

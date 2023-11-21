window.addEventListener("load", () => {
    [...document.getElementsByTagName("button")]
        .forEach((element) => {
            if (!element.attributes["data-pdf-modal"]) return;
            const file = element.attributes["data-pdf-modal"].value;

            const target = file.replace(".pdf", "").replace(/\/|\s/g, "-") + "-modal";

            element.setAttribute("data-bs-toggle", "modal");
            element.setAttribute("data-bs-target", "#" + target);

            const div = document.createElement("div");
            div.setAttribute("id", target);
            div.setAttribute("class", "modal fade");
            div.setAttribute("tabindex", "-1");
            div.innerHTML = `
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">PDF</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body m-0 p-0">
                            <object data="${file}" type="application/pdf" width="100%" height="100%">
                                <a href="${file}">View PDF</a>
                            </object>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(div);
        });
});
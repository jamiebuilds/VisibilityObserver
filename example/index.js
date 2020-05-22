import VisibilityObserver from "../src/VisibilityObserver"

document.getElementById("green").scrollTo({ top: 150, left: 150 })
document.getElementById("red").scrollTo({ top: 300, left: 300 })
document.getElementById("yellow").scrollTo({ top: 50, left: 50 })

let target = document.getElementById("target")
let overlay = document.getElementById("overlay")
let text = document.getElementById("text")

let observer = new VisibilityObserver((entries) => {
	for (let entry of entries) {
		if (entry.target === target) {
			let rect = entry.visibleRect

			overlay.style.setProperty("display", rect ? "block" : "none")
			overlay.style.setProperty("top", rect ? `${rect.y}px` : null)
			overlay.style.setProperty("left", rect ? `${rect.x}px` : null)
			overlay.style.setProperty("width", rect ? `${rect.width}px` : null)
			overlay.style.setProperty("height", rect ? `${rect.height}px` : null)

			text.innerText = JSON.stringify(rect)
		}
	}
})

observer.observe(target)

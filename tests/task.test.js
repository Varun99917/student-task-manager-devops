
const test = require("node:test");
const assert = require("node:assert/strict");

const BASE_URL = "http://localhost:3000";

test("Student Task Manager API Tests", async (t) => {

    let taskId;

    await t.test("Health check should return OK", async () => {
        const response = await fetch(`${BASE_URL}/health`);
        const data = await response.json();

        assert.equal(response.status, 200);
        assert.equal(data.status, "OK");
    });

    await t.test("Should add a new task", async () => {
        const response = await fetch(`${BASE_URL}/api/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Automated Testing Task" })
        });

        const data = await response.json();

        assert.equal(response.status, 201);
        assert.equal(data.title, "Automated Testing Task");

        taskId = data._id;
    });

    await t.test("Should fetch all tasks", async () => {
        const response = await fetch(`${BASE_URL}/api/tasks`);
        const data = await response.json();

        assert.equal(response.status, 200);
        assert.ok(data.some(task => task._id === taskId));
    });

    await t.test("Should mark task as completed", async () => {
        const response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed: true })
        });

        const data = await response.json();

        assert.equal(response.status, 200);
        assert.equal(data.completed, true);
    });

    await t.test("Should delete a task", async () => {
        const response = await fetch(`${BASE_URL}/api/tasks/${taskId}`, {
            method: "DELETE"
        });

        assert.equal(response.status, 200);
    });

    await t.test("Should reject an empty task", async () => {
        const response = await fetch(`${BASE_URL}/api/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "   " })
        });

        assert.equal(response.status, 400);
    });
});

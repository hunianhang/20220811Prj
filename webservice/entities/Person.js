module.exports = class Person {
    constructor(node) {
        this.node = node
    }

    getId() {
        return this.node.properties.id
    }

    getName() {
        return this.node.properties.name
    }

    getState() {
        return this.node.properties.state
    }

    getPerson() {
        const { id, name, state } = this.node.properties
        return {
            id,
            name,
            state
        }
    }

    toJson() {
        const { ...properties } = this.node.properties;

        return {
            ...properties,
        }
    }
}
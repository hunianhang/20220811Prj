module.exports = class Friends {
    constructor(node, relation) {
        this.node = node
        this.relation = relation
    }

    getId(){
        return this.node.properties.id
    }

    getName(){
        return this.node.properties.name
    }

    getState(){
        return this.node.properties.state
    }

    getYear() {
        return this.relation.properties.year
    }

    toJson() {
        return {
            id: this.getId(),
            name: this.getName(),
            state: this.getState(),
            year: this.getYear()
        }
    }
}
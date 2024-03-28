FROM golang:latest

WORKDIR /container/

# Copy only the go.mod and go.sum files to download dependencies
COPY /container/go.mod ./

# Download dependencies
RUN go mod download

COPY ../rudan-disp/dist/. ./static/.

# Copy the rest of the application code
COPY ./container .

# Build the application
RUN go build -o main .

EXPOSE 8080

# Run
CMD ["./main"]
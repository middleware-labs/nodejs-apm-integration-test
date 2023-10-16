// const { getTraceExporter } = require('@middleware.io/node-apm');
const { SpanStatusCode, TraceFlags } = require('@opentelemetry/api');
const { Resource }  = require('@opentelemetry/resources');
// config = require('./app').config
const {config} = require('./config')
const http = require('http');

const options = {
  hostname: '127.0.0.1', // Replace with the hostname of the server you want to request.
  path: '/api/tutorials', // Replace with the path of the API endpoint you want to access.
  method: 'GET',
  port: '3002'
};



// This will check if APM can find Host Agent or not
function checkConnectionWithHostAgent() {
    const mockedReadableSpan = {
        name: 'documentFetch',
        kind: 0,
        spanContext: () => {
        return {
            traceId: '1f1008dc8e270e85c40a0d7c3939b278',
            spanId: '5e107261f64fa53e',
            traceFlags: TraceFlags.SAMPLED,
        };
        },
        parentSpanId: '78a8915098864388',
        startTime: [1574120165, 429803070],
        endTime: [1574120165, 438688070],
        ended: true,
        status: { code: SpanStatusCode.OK },
        attributes: { component: 'document-load' },
        links: [
        {
            context: {
            traceId: '1f1008dc8e270e85c40a0d7c3939b278',
            spanId: '78a8915098864388',
            traceFlags: TraceFlags.SAMPLED,
            },
            attributes: { component: 'document-load' },
        },
        ],
        events: [
        {
            name: 'fetchStart',
            time: [1574120165, 429803070],
        },
        {
            name: 'domainLookupStart',
            time: [1574120165, 429803070],
        },
        {
            name: 'domainLookupEnd',
            time: [1574120165, 429803070],
        },
        {
            name: 'connectStart',
            time: [1574120165, 429803070],
        },
        {
            name: 'connectEnd',
            time: [1574120165, 429803070],
        },
        {
            name: 'requestStart',
            time: [1574120165, 435513070],
        },
        {
            name: 'responseStart',
            time: [1574120165, 436923070],
        },
        {
            name: 'responseEnd',
            time: [1574120165, 438688070],
        },
        ],
        duration: [0, 8885000],
        resource: Resource.default().merge(
        new Resource({
            service: 'ui',
            version: 1,
            cost: 112.12,
        })
        ),
        instrumentationLibrary: { name: 'default', version: '0.0.1' },
        droppedAttributesCount: 0,
        droppedEventsCount: 0,
        droppedLinksCount: 0,
    };

    // traceExporter = getTraceExporter()
    
    const spans = [Object.assign({}, mockedReadableSpan)];

    config.traceExporter.export(spans, (error, response) => {

        // console.log("error<<<", error)
        
        if (error.code = "0") {
            console.log("Middleware APM -- Middleware Host Agent : Communication Established !")

            // todo: send a notification to bifrost
        } else {
            // Handle the error
            console.error('Erro11r:', error.code);
        }

    });
}

function checkIfAPMRecordsTraces()  {
    const req = http.request(options, (res) => {
        let data = '';
      
        res.on('data', (chunk) => {
          data += chunk;
        });
      
        res.on('end', () => {
          console.log(data);
        });
      });
      
      req.on('error', (error) => {
        console.error(error);
      });
      
      req.end();  

      setTimeout(() => {
        // Ensure spans are flushed to the exporter
        config.traceExporter.shutdown().then((res) => {
            console.log("res", res)
        //   done();
        });
      }, 1000); // Wait for a moment to ensure the trace is processed
}

checkIfAPMRecordsTraces()
checkConnectionWithHostAgent()

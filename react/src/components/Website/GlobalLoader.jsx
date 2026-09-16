import { motion, AnimatePresence } from 'framer-motion';
import '../../css/Website/globalLoader.css';

const GlobalLoader = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="global-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <div className="global-loader-content">
            <motion.div
              className="loader-logo"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* ✅ New SVG Logo (transparent background) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 813 565"
                className="loader-svg"
              >
                <defs>
                  <linearGradient
                    id="microzeeGradient"
                    x1="0%"
                    y1="100%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#1237D6" />
                    <stop offset="45%" stopColor="#005BFF" />
                    <stop offset="75%" stopColor="#09A8FF" />
                    <stop offset="100%" stopColor="#19D8FF" />
                  </linearGradient>

                  <filter
                    id="blueGlow"
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="160%"
                  >
                    <feGaussianBlur stdDeviation="7" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="
                      0 0 0 0 0
                      0 0 0 0.55 0
                      0 0 0 1 0
                      0 0 0 1 0"
                    />
                    <feMerge>
                      <feMergeNode />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <path
                  d="
                  M212,538.5
                  L161,534.5
                  L116.5,519
                  L155,518.5
                  L185,512.5
                  L248,481.5
                  L581,159.5
                  L634.5,146
                  L625,148.5
                  L623,142.5
                  L606,139.5
                  L637,139.5
                  L638,144.5
                  L646.5,140
                  L633.5,138
                  L639,135.5
                  L443,139.5
                  L396,151.5
                  L357,177.5
                  L379.5,135
                  L404,108.5
                  L441,85.5
                  L479,74.5
                  L657,73.5
                  L702,67.5
                  L754,46.5
                  L795.5,18
                  L767.5,65
                  L768.5,72
                  L760.5,75
                  L760.5,83
                  L751.5,88
                  L753.5,92
                  L725.5,120
                  L731.5,120
                  L396.5,439
                  L454,424.5
                  L609,424.5
                  L648,418.5
                  L695,399.5
                  L744,360.5
                  L714.5,426
                  L680,465.5
                  L644,487.5
                  L616,495.5
                  L353,497.5
                  L325,503.5
                  L265,528.5
                  Z

                  M163,493.5
                  L116,486.5
                  L76,461.5
                  L43.5,416
                  L25.5,356
                  L22.5,289
                  L32.5,227
                  L56.5,168
                  L79.5,134
                  L99,114.5
                  L126,97.5
                  L148,91.5
                  L175,92.5
                  L203,103.5
                  L230.5,128
                  L304.5,245
                  L322,257.5
                  L341,253.5
                  L383.5,203
                  L417,175.5
                  L451,163.5
                  L500.5,163
                  L455.5,201
                  L386.5,303
                  L365,320.5
                  L332,331.5
                  L299,327.5
                  L267,307.5
                  L199.5,208
                  L178,184.5
                  L163,177.5
                  L138,184.5
                  L110.5,225
                  L97.5,272
                  L97.5,332
                  L112.5,380
                  L141,413.5
                  L165,427.5
                  L191,435.5
                  L232,436.5
                  L279.5,421
                  L251,451.5
                  L226,470.5
                  L192,487.5
                  Z"
                  fill="url(#microzeeGradient)"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  filter="url(#blueGlow)"
                />
              </svg>
            </motion.div>

            <motion.h2
              className="loader-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              MicroZee Solutions
            </motion.h2>
            <motion.p
              className="loader-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Loading amazing experiences...
            </motion.p>

            <div className="loader-progress-track">
              <motion.div
                className="loader-progress-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoader;